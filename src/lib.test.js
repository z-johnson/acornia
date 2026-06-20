import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  FOLK, CLASSES, ATTRS, AL, AD, ALL_SKILLS, LEVEL_TABLE, CONDITIONS,
  loadChars, saveChars, uid,
  nextEN, abilsUnlocked, getAPMax, calcMaxHP, getBaseAttrs, applyFolkMod, applyLevelUp,
} from './lib.js';

// ─── Data integrity ────────────────────────────────────────────────────────

describe('FOLK data', () => {
  it('has exactly 5 folk', () => {
    expect(Object.keys(FOLK)).toHaveLength(5);
  });

  it('every folk has required fields', () => {
    for (const [name, f] of Object.entries(FOLK)) {
      expect(f.tag, `${name}.tag`).toBeTypeOf('string');
      expect(f.emoji, `${name}.emoji`).toBeTypeOf('string');
      expect(f.abilities, `${name}.abilities`).toHaveLength(3);
      expect(f.gear, `${name}.gear`).toBeTypeOf('string');
    }
  });

  it('Greycoat has anyAttr flag and empty mod', () => {
    expect(FOLK.Greycoat.anyAttr).toBe(true);
    expect(FOLK.Greycoat.mod).toEqual({});
  });

  it('Redpelt mod sums to zero (agility +1, wits -1)', () => {
    const sum = Object.values(FOLK.Redpelt.mod).reduce((a, b) => a + b, 0);
    expect(sum).toBe(0);
  });

  it('Palewhisker insight mod is +2', () => {
    expect(FOLK.Palewhisker.mod.insight).toBe(2);
  });
});

describe('CLASSES data', () => {
  it('has exactly 5 classes', () => {
    expect(Object.keys(CLASSES)).toHaveLength(5);
  });

  it('every class has required fields', () => {
    for (const [name, cl] of Object.entries(CLASSES)) {
      expect(cl.coreAttr, `${name}.coreAttr`).toBeTypeOf('string');
      expect(ATTRS).toContain(cl.coreAttr);
      expect(cl.hpBase, `${name}.hpBase`).toBeTypeOf('number');
      expect(cl.hpPerLevel, `${name}.hpPerLevel`).toBeTypeOf('number');
      expect(cl.abilities, `${name}.abilities`).toHaveLength(4);
      expect(cl.gear, `${name}.gear`).toBeInstanceOf(Array);
      expect(cl.legendaryTitle, `${name}.legendaryTitle`).toBeTypeOf('string');
      expect(cl.capstone, `${name}.capstone`).toBeTypeOf('string');
    }
  });

  it('ability levels are 1, 2, 4, 6 for every class', () => {
    for (const [name, cl] of Object.entries(CLASSES)) {
      const levels = cl.abilities.map(a => a.level);
      expect(levels, `${name} ability levels`).toEqual([1, 2, 4, 6]);
    }
  });

  it('Oakshield Warrior has highest hpPerLevel', () => {
    const hpLevels = Object.values(CLASSES).map(cl => cl.hpPerLevel);
    expect(CLASSES['Oakshield Warrior'].hpPerLevel).toBe(Math.max(...hpLevels));
  });
});

describe('LEVEL_TABLE data', () => {
  it('has exactly 10 levels', () => {
    expect(LEVEL_TABLE).toHaveLength(10);
  });

  it('levels are sequential from 1 to 10', () => {
    LEVEL_TABLE.forEach((row, i) => {
      expect(row.level).toBe(i + 1);
    });
  });

  it('EN requirements are strictly increasing', () => {
    for (let i = 1; i < LEVEL_TABLE.length; i++) {
      expect(LEVEL_TABLE[i].en).toBeGreaterThan(LEVEL_TABLE[i - 1].en);
    }
  });

  it('level 1 starts at 0 EN', () => {
    expect(LEVEL_TABLE[0].en).toBe(0);
  });
});

describe('CONDITIONS data', () => {
  it('has exactly 7 conditions', () => {
    expect(CONDITIONS).toHaveLength(7);
  });

  it('every condition has a name and desc', () => {
    CONDITIONS.forEach(c => {
      expect(c.name).toBeTypeOf('string');
      expect(c.desc).toBeTypeOf('string');
    });
  });
});

describe('ALL_SKILLS data', () => {
  it('covers all 6 attributes', () => {
    ATTRS.forEach(a => {
      expect(ALL_SKILLS[a], `skills for ${a}`).toBeInstanceOf(Array);
      expect(ALL_SKILLS[a].length).toBeGreaterThan(0);
    });
  });
});

// ─── Storage ───────────────────────────────────────────────────────────────

describe('loadChars / saveChars', () => {
  beforeEach(() => {
    // Provide a simple localStorage stub
    const store = {};
    vi.stubGlobal('localStorage', {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = v; },
      removeItem: (k) => { delete store[k]; },
    });
  });

  it('loadChars returns [] when nothing is stored', () => {
    expect(loadChars()).toEqual([]);
  });

  it('saveChars then loadChars round-trips data', () => {
    const chars = [{ id: 'abc', name: 'Test' }];
    saveChars(chars);
    expect(loadChars()).toEqual(chars);
  });

  it('loadChars returns [] when localStorage contains invalid JSON', () => {
    localStorage.setItem('acornia-v2', '{bad json}');
    expect(loadChars()).toEqual([]);
  });

  it('saveChars silently handles a failing localStorage', () => {
    vi.stubGlobal('localStorage', {
      setItem: () => { throw new Error('QuotaExceeded'); },
    });
    expect(() => saveChars([{ id: '1' }])).not.toThrow();
  });
});

describe('uid', () => {
  it('returns an 8-character alphanumeric string', () => {
    const id = uid();
    expect(id).toMatch(/^[a-z0-9]{8}$/);
  });

  it('generates unique values', () => {
    const ids = new Set(Array.from({ length: 200 }, uid));
    expect(ids.size).toBe(200);
  });
});

// ─── nextEN ────────────────────────────────────────────────────────────────

describe('nextEN', () => {
  it('returns correct EN thresholds from the level table', () => {
    expect(nextEN(1)).toBe(2);
    expect(nextEN(2)).toBe(5);
    expect(nextEN(9)).toBe(54);
  });

  it('returns 9999 at max level (10)', () => {
    expect(nextEN(10)).toBe(9999);
  });
});

// ─── abilsUnlocked ────────────────────────────────────────────────────────

describe('abilsUnlocked', () => {
  it('level 1 unlocks only the first ability (index 0)', () => {
    expect(abilsUnlocked(1)).toEqual([0]);
  });

  it('level 2 unlocks indices 0 and 1', () => {
    expect(abilsUnlocked(2)).toEqual([0, 1]);
  });

  it('level 3 still only two unlocked (no new ability at 3)', () => {
    expect(abilsUnlocked(3)).toEqual([0, 1]);
  });

  it('level 4 unlocks index 2', () => {
    expect(abilsUnlocked(4)).toContain(2);
  });

  it('level 6 unlocks all 4 abilities', () => {
    expect(abilsUnlocked(6)).toEqual([0, 1, 2, 3]);
  });

  it('levels above 6 still return all 4', () => {
    expect(abilsUnlocked(10)).toEqual([0, 1, 2, 3]);
  });
});

// ─── getAPMax ─────────────────────────────────────────────────────────────

describe('getAPMax', () => {
  it('levels 1–3 give 2 AP', () => {
    expect(getAPMax(1)).toBe(2);
    expect(getAPMax(3)).toBe(2);
  });

  it('levels 4–8 give 3 AP', () => {
    expect(getAPMax(4)).toBe(3);
    expect(getAPMax(8)).toBe(3);
  });

  it('levels 9–10 give 4 AP', () => {
    expect(getAPMax(9)).toBe(4);
    expect(getAPMax(10)).toBe(4);
  });
});

// ─── calcMaxHP ────────────────────────────────────────────────────────────

describe('calcMaxHP', () => {
  const warriorAttrs = { brawn: 2, agility: 1, wits: 1, insight: 1, presence: 1, cunning: 1 };
  const rogueAttrs   = { brawn: 1, agility: 1, wits: 1, insight: 1, presence: 1, cunning: 2 };

  it('Oakshield Warrior level 1 with brawn 2: 6 + 2 = 8', () => {
    expect(calcMaxHP('Oakshield Warrior', warriorAttrs, 1)).toBe(8);
  });

  it('Briar Rogue level 1 with cunning 2: 4 + 2 = 6', () => {
    expect(calcMaxHP('Briar Rogue', rogueAttrs, 1)).toBe(6);
  });

  it('adds hpPerLevel for each level above 1', () => {
    // Warrior hpPerLevel = 3
    expect(calcMaxHP('Oakshield Warrior', warriorAttrs, 2)).toBe(8 + 3);
    expect(calcMaxHP('Oakshield Warrior', warriorAttrs, 5)).toBe(8 + 3 * 4);
  });

  it('returns 6 for an unknown class', () => {
    expect(calcMaxHP('Unknown', warriorAttrs, 1)).toBe(6);
  });

  it('uses core attribute value, not a hardcoded default', () => {
    const lowBrawn = { ...warriorAttrs, brawn: 1 };
    expect(calcMaxHP('Oakshield Warrior', lowBrawn, 1)).toBe(7); // 6 + 1
  });
});

// ─── getBaseAttrs ─────────────────────────────────────────────────────────

describe('getBaseAttrs', () => {
  it('all attributes start at 1', () => {
    const base = getBaseAttrs('');
    ATTRS.forEach(a => expect(base[a]).toBe(1));
  });

  it('core attribute starts at 2', () => {
    const base = getBaseAttrs('cunning');
    expect(base.cunning).toBe(2);
    expect(base.brawn).toBe(1);
  });

  it('covers all 6 attributes', () => {
    expect(Object.keys(getBaseAttrs('brawn'))).toHaveLength(6);
  });
});

// ─── applyFolkMod ─────────────────────────────────────────────────────────

describe('applyFolkMod', () => {
  const base = { brawn: 1, agility: 1, wits: 1, insight: 1, presence: 1, cunning: 1 };

  it('Redpelt: agility +1, wits -1', () => {
    const res = applyFolkMod(base, 'Redpelt');
    expect(res.agility).toBe(2);
    expect(res.wits).toBe(1); // min clamp: 1 - 1 = 0, clamped to 1
  });

  it('Shadowtail: cunning +1, presence -1', () => {
    const res = applyFolkMod(base, 'Shadowtail');
    expect(res.cunning).toBe(2);
    expect(res.presence).toBe(1); // clamped to 1
  });

  it('Palewhisker: insight +2, brawn -1', () => {
    const res = applyFolkMod(base, 'Palewhisker');
    expect(res.insight).toBe(3);
    expect(res.brawn).toBe(1); // clamped to 1
  });

  it('Greycoat with chosen attr applies +1 to that attr', () => {
    const res = applyFolkMod(base, 'Greycoat', 'presence');
    expect(res.presence).toBe(2);
  });

  it('Greycoat without chosen attr applies no modifier', () => {
    const res = applyFolkMod(base, 'Greycoat', '');
    expect(res).toEqual(base);
  });

  it('caps at 3 even with large existing value', () => {
    const high = { ...base, insight: 2 };
    const res = applyFolkMod(high, 'Palewhisker'); // +2 insight
    expect(res.insight).toBe(3); // capped
  });

  it('clamps negative mods to min 1', () => {
    const res = applyFolkMod(base, 'Glideborn'); // brawn -1 from 1 → stays 1
    expect(res.brawn).toBe(1);
  });

  it('returns original attrs unchanged for unknown folk', () => {
    const res = applyFolkMod(base, 'UnknownFolk');
    expect(res).toEqual(base);
  });

  it('does not mutate the original attrs object', () => {
    const original = { ...base };
    applyFolkMod(base, 'Redpelt');
    expect(base).toEqual(original);
  });
});

// ─── applyLevelUp ─────────────────────────────────────────────────────────

describe('applyLevelUp', () => {
  const baseChar = {
    id: 'x1',
    charClass: 'Oakshield Warrior', // hpPerLevel: 3
    level: 1,
    hpMax: 8,
    hpCurrent: 5, // damaged — should NOT be fully healed
    attrs: { brawn: 2, agility: 1, wits: 1, insight: 1, presence: 1, cunning: 1 },
    prestigeSkill: '',
    legendaryTitle: '',
  };

  it('increments level by 1', () => {
    expect(applyLevelUp(baseChar).level).toBe(2);
  });

  it('increases hpMax by hpPerLevel', () => {
    expect(applyLevelUp(baseChar).hpMax).toBe(11); // 8 + 3
  });

  it('increases hpCurrent by hpPerLevel, not full heal', () => {
    // Was at 5/8, gains 3 → 8/11 (not 11/11)
    const u = applyLevelUp(baseChar);
    expect(u.hpCurrent).toBe(8);
    expect(u.hpCurrent).toBeLessThan(u.hpMax);
  });

  it('hpCurrent never exceeds new hpMax', () => {
    const fullHP = { ...baseChar, hpCurrent: 8 }; // at full health
    const u = applyLevelUp(fullHP);
    expect(u.hpCurrent).toBe(u.hpMax);
  });

  it('applies attribute choice when provided', () => {
    const u = applyLevelUp(baseChar, 'agility');
    expect(u.attrs.agility).toBe(2);
  });

  it('caps attribute at 3', () => {
    const maxChar = { ...baseChar, attrs: { ...baseChar.attrs, brawn: 3 } };
    const u = applyLevelUp(maxChar, 'brawn');
    expect(u.attrs.brawn).toBe(3);
  });

  it('no attribute change when attrChoice is null', () => {
    const u = applyLevelUp(baseChar, null);
    expect(u.attrs).toEqual(baseChar.attrs);
  });

  it('applies prestige skill when provided', () => {
    const u = applyLevelUp(baseChar, null, 'Sneak Attack');
    expect(u.prestigeSkill).toBe('Sneak Attack');
  });

  it('sets legendaryTitle at level 10', () => {
    const nearMax = { ...baseChar, level: 9 };
    const u = applyLevelUp(nearMax);
    expect(u.legendaryTitle).toBe('Iron Sentinel');
    expect(u.level).toBe(10);
  });

  it('does not mutate the original character', () => {
    const original = JSON.stringify(baseChar);
    applyLevelUp(baseChar, 'agility', 'Sneak Attack');
    expect(JSON.stringify(baseChar)).toBe(original);
  });
});
