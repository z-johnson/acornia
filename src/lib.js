/* ─── GAME DATA ──────────────────────────────────────────────────────────── */
export const FOLK = {
  Greycoat:{tag:"The Common Heart of Acornia",emoji:"🐿️",mod:{},anyAttr:true,
    bonus:"Choose one skill at creation: +1d6 permanently on all rolls of that type",
    trait:"Adaptable — no innate magic; absorbs techniques faster than any other folk",
    gear:"City travel cloak, Forged city pass, Common tool kit, 3 days rations, 5 AC",
    abilities:[
      {name:"Quick Study",desc:"Once per session: after witnessing an ally succeed on a roll, copy their exact result on your next identical roll. No dice needed. Declare before you roll."},
      {name:"Blend In",desc:"Automatically blend into any crowd, gathering, or group without rolling. Even hostile crowds won't single you out unless you act suspiciously."},
      {name:"Urban Savvy",desc:"Auto-succeed on all navigation, local landmark, and social knowledge checks inside any city or town. No roll required."},
    ]},
  Redpelt:{tag:"Fierce Children of the Old Groves",emoji:"🦊",mod:{agility:1,wits:-1},
    bonus:"+1d6 to all Leap, Climb, Sprint, and tree-traversal rolls",
    trait:"Fierce — territorial and proud; enemies consistently underestimate them",
    gear:"Carved bone totem (ritual focus), Bark-fibre armour (-1 dmg), Hunting knife (1d6), 2 days rations, 3 AC",
    abilities:[
      {name:"Grove Memory",desc:"Sense whether any forest or grove you enter has been corrupted, cursed, or magically altered. No roll required — the GM must tell you if the land is wrong."},
      {name:"Territory Mark",desc:"Free action: mark your current zone. Any enemy who enters that zone must re-roll their very first attack made inside it. Lasts until you leave or combat ends."},
      {name:"Red Rush",desc:"Once per combat: move one additional zone as part of your existing movement. No action cost. Use it after seeing where enemies are positioned."},
    ]},
  Shadowtail:{tag:"Born from Moonlit Canopies",emoji:"🖤",mod:{cunning:1,presence:-1},
    bonus:"+1d6 to all Stealth, Deception, Sleight of Hand, and Concealment rolls",
    trait:"Elusive — masters of shadow and misdirection; rarely seen until too late",
    gear:"Dark hooded cloak (+1d6 Stealth in dim/dark), Smoke-seed pouch (3 uses, obscuring cloud), Lock-pick twig set, 4 AC",
    abilities:[
      {name:"Nightvision",desc:"No penalties of any kind to rolls, movement, or actions in complete darkness or dim light. You see in dim light as clearly as daylight."},
      {name:"Whisper Step",desc:"Once per scene: move from your current position to any adjacent zone without any roll, noise, or chance of detection. Free action."},
      {name:"Shadow Meld",desc:"While completely still and not actively doing anything, you are invisible to any creature more than 2 zones away. Any movement or action breaks this immediately."},
    ]},
  Glideborn:{tag:"Those Who Touch the Sky",emoji:"🪂",mod:{agility:1,brawn:-1},
    bonus:"+1d6 to all aerial movement rolls and any ranged attack made while airborne",
    trait:"Soaring — born to the high branches; the open sky is their natural domain",
    gear:"Wind-silk glide-cloak (enables Glide; destroyed if torn), Messenger satchel (waterproof), Sky-map scroll (current region), 6 AC",
    abilities:[
      {name:"Glide",desc:"Travel up to 3 zones horizontally through open air as free movement. No roll required. Requires at least one zone of height to initiate."},
      {name:"Wind Read",desc:"Predict weather for the next 24 hours with perfect accuracy. No roll required. The GM must give you accurate conditions for the period ahead."},
      {name:"Dive Strike",desc:"When attacking a target by descending from higher elevation, your first hit of that combat gains +2 bonus damage. Triggers once per combat on the opening attack only."},
    ]},
  Palewhisker:{tag:"The Touched Ones, Marked by Fate",emoji:"🤍",mod:{insight:2,brawn:-1},
    bonus:"+1d6 to all Insight, Ritual, Spirit Communication, and Fate-related rolls",
    trait:"Fatebound — born perhaps once a generation; their white fur marks them as omens",
    gear:"Bone-rune reading pouch (Insight 4+ for portents), White hooded travelling cloak, Spirit-candle (3 charges), 3 AC",
    abilities:[
      {name:"Ill Omen",desc:"Once per session: force any one enemy to immediately re-roll a Success result they just achieved. They must use the new roll. Declare immediately after seeing their result."},
      {name:"Fate Sense",desc:"Once per session: ask the GM one yes-or-no question about events in the near future (within the current session). The GM must answer truthfully and concisely."},
      {name:"Unsettling Presence",desc:"The first time any enemy focuses attention on you in a scene, they must roll Wits 4+. On a failure, they cannot take an action against you this round."},
    ]},
};

export const CLASSES = {
  "Oakshield Warrior":{tag:"Iron Will, Acorn-Hard",icon:"⚔️",coreAttr:"brawn",hpBase:6,hpPerLevel:3,
    role:"The frontline anchor. Absorbs punishment, controls space, and protects allies. The best Warriors are the ones the enemy simply cannot get past.",
    gear:["Ironwood Club — 1d6+1 dmg, Close, two-handed","Acorn-Cap Shield — 1 free defense re-roll per combat","Bark Plate Armour — -1 all incoming damage, Worn","Iron-Bond Oath Token — allies within Close get +1 to Presence rolls","War Rations (3 days)","5 Acorns"],
    abilities:[
      {name:"Ironbark Stance",level:1,desc:"Declare BEFORE the enemy rolls their attack. All damage you receive this round is halved (round down, min 1). Includes all damage sources. Once per combat."},
      {name:"Tree-Shaker",level:2,desc:"On a Full Success (6) melee attack: target is knocked Prone and loses their next action entirely as they recover. Works on any melee attack."},
      {name:"Battle Sap",level:4,desc:"Immediately after taking any damage, your next attack roll gains +1d6. Persists until used or combat ends. Stacks up to +2d6 from multiple hits."},
      {name:"Wardens Call",level:6,desc:"Passive. All allied characters within 1 zone gain +1 to all defense-related rolls. Disappears if you are Downed, Frightened, or leave the zone."},
    ],
    capstone:"Ironbark Stance lasts the full combat. Wardens Call extends to all zones.",
    legendaryTitle:"Iron Sentinel"},
  "Briar Rogue":{tag:"Quick Paws, Quiet Shadows",icon:"🗡️",coreAttr:"cunning",hpBase:4,hpPerLevel:2,
    role:"Wins fights before they start. Through misdirection, positioning, and sudden violence, a skilled Rogue eliminates threats before teammates are even in danger.",
    gear:["Thorn Daggers ×2 — 1d6 each, Close, concealable, dual-wield capable","Sling + 10 Stones — 1d6, Near range, silent with care","Grapple-Vine — 10ft, Agility 4+ to use offensively","Shadow-Cloak — +1d6 Stealth in dim/dark","Forged Guild Sigil — opens underworld contacts in most settlements","8 Acorns"],
    abilities:[
      {name:"Sneak Attack",level:1,desc:"When attacking an unaware target OR a flanked target (ally on opposite side in same zone), deal +2d6 bonus damage on a hit. Works with any weapon."},
      {name:"Vanish",level:2,desc:"Once per scene: disappear into shadow as a free action. You are immediately hidden. Your very next action is performed completely unseen. After it resolves, you are visible again."},
      {name:"Poison Thorn",level:4,desc:"As an action, apply crafted toxin to one weapon. On a hit, the target loses 1 HP at the start of each of their turns for 3 rounds. No saving throw. Stacks."},
      {name:"Acorn Bomb",level:6,desc:"Hurl a stun-seed into any zone within Near range. Every creature in that zone rolls Wits 4+. Those who fail lose their next action. You are immune to your own bombs. Carry 3, replenish on rest."},
    ],
    capstone:"Vanish resets every scene. Sneak Attack bonus becomes +3d6 permanently.",
    legendaryTitle:"Ghost of the Briar"},
  "Grove Shaman":{tag:"Keeper of Root and Sky",icon:"🌿",coreAttr:"insight",hpBase:3,hpPerLevel:2,
    role:"The connective tissue of any party — healer, controller, and the only class that can directly interact with the spiritual forces shaping Acornia.",
    gear:["Twisted Root Staff — 1d6, Close, ritual focus (required for Storm Seed)","Ritual Herb Pouch — 5 uses, +1d6 to any single Insight roll, refills on long rest","Spirit-Drum — required for Spirit Call, audible 3 zones away","Bone Amulet — immune to first Poisoned condition each session","Seed-Rattle — commune with plant spirits, Insight 4+ for local information","3 Acorns"],
    abilities:[
      {name:"Bark Mend",level:1,desc:"Full action: lay hands on one ally within Close. They immediately recover 1d6 HP. Once per scene. You may use it on yourself. Using a Ritual Herb charge adds +1d6 to the healing."},
      {name:"Spirit Call",level:2,desc:"Full action + Spirit-Drum: summon one nature spirit for 3 rounds. Choose: Wolf-Mouse (HP 4, attacks Close 1d6, can flank), Crow (HP 3, flies, carries items, attacks Near 1d6), or Mushroom Sprite (HP 5, immovable, Poisoned spores to Close enemies — Wits 4+ each round)."},
      {name:"Root Snare",level:4,desc:"Point your Root Staff at any visible target within Near range and spend an action. Magical roots bind the target — they cannot move until they spend an action and pass Brawn 4+. Flying targets immune unless within Near of a surface. Lasts indefinitely."},
      {name:"Storm Seed",level:6,desc:"Charge your Root Staff (free action) then hurl a crackling acorn into any Near zone (action). Every creature in that zone takes 2d6 lightning damage. Armour provides no reduction. Carry 3 seeds; replenish on long rest."},
    ],
    capstone:"Bark Mend heals 2d6. Spirit Call summons two spirits simultaneously.",
    legendaryTitle:"Voice of Yggdorn"},
  "Canopy Ranger":{tag:"Eyes of the High Branches",icon:"🏹",coreAttr:"agility",hpBase:5,hpPerLevel:2,
    role:"Sees threats before anyone else, eliminates them from distances others cannot reach, and ensures the party never stumbles into an ambush.",
    gear:["Shortbow — 1d6+1, Near or Far range (Far without Eagle Eye: -1d6)","20 Thorn-Tipped Arrows — standard ammo, recoverable after combat","Twin Bark-Knives — 1d6 each, Close, dual-wield once per combat for +1d6","Wilderness Pack — 5 days rations, 30ft rope, fire-kit, first-aid moss (1 HP, 3 uses)","Beast-Bond Charm — required for Beast Bond ability","6 Acorns"],
    abilities:[
      {name:"Eagle Eye",level:1,desc:"Passive. All ranged attacks ignore cover penalties. The opening shot at the start of each combat gains +1d6 bonus die (before any enemy has acted). Resets each new combat."},
      {name:"Beast Bond",level:2,desc:"Over one day with a small animal, form a permanent bond. It acts on your initiative. Choose its function: Scout (moves 2 zones ahead, reports using your Wits check), Distract (forces enemy focus for 1 round, Agility 4+), or Fetch (retrieves small object within 2 zones). Has 3 HP, cannot attack."},
      {name:"Predator Sense",level:4,desc:"Passive. Cannot be ambushed — you always act in any ambush attempt. Always know when you are being followed, watched, or tracked. When your party would walk into a trap, you sense it before it triggers."},
      {name:"Trailblazer",level:6,desc:"Passive. The entire party moves at double speed in wilderness. All terrain penalties ignored. You never become lost in wilderness — navigation rolls auto-succeed. Does not apply in cities or buildings."},
    ],
    capstone:"Eagle Eye extends to melee (ignore armour on a 6). Trailblazer works in cities.",
    legendaryTitle:"Warden of the Paths"},
};

export const ATTRS = ["brawn","agility","wits","insight","presence","cunning"];
export const AL = {brawn:"Brawn",agility:"Agility",wits:"Wits",insight:"Insight",presence:"Presence",cunning:"Cunning"};
export const AD = {brawn:"Melee, strength, endurance, resisting knockback",agility:"Ranged attacks, climbing, dodging, sprinting",wits:"Perception, reactions, awareness, street knowledge",insight:"Magic, nature sense, ritual, reading people",presence:"Charm, intimidation, inspiring allies, social pressure",cunning:"Stealth, traps, lockpicking, deception, crafting"};

export const ALL_SKILLS = {
  brawn:["Strike (melee)","Shove / Grapple","Endure (fatigue & saves)","Break / Force (obstacles)","Throw"],
  agility:["Shoot (ranged)","Climb / Leap","Dodge / Evade","Sprint / Flee","Glide (airborne)","Balance / Tumble"],
  wits:["Spot / Listen","React (initiative)","Navigate / Track","Recall (lore & knowledge)","Read Situation (tactics)"],
  insight:["Ritual / Cast","Nature Sense","Read Person (motives)","Spirit Commune","Foresee (portents)"],
  presence:["Persuade / Charm","Intimidate","Rally / Inspire allies","Perform / Entertain","Command (give orders)"],
  cunning:["Stealth / Hide","Lockpick / Disarm trap","Craft / Tinker","Set Trap","Sleight of Hand","Deceive / Bluff"],
};

export const LEVEL_TABLE = [
  {level:1,en:0,gains:["Start with Core Attribute 2, all others 1","Spend 2 creation points on any attributes (max 2 per attribute before folk modifier)","Apply folk stat modifier (can push to 3; min always 1)","2 AP per session","Unlock Level 1 class ability","3 folk abilities all unlocked at start"]},
  {level:2,en:2,gains:["+HP per class amount","Unlock 2nd class ability"]},
  {level:3,en:5,gains:["+HP per class amount","Raise any one Attribute by +1 (max 3)"]},
  {level:4,en:9,gains:["+HP per class amount","Unlock 3rd class ability","+1 AP per session (permanent — now 3/session)"]},
  {level:5,en:14,gains:["+HP per class amount","Raise any one Attribute by +1 (max 3)","Unlock bonus folk ability (may retrain one skill bonus)"]},
  {level:6,en:20,gains:["+HP per class amount","Unlock 4th class ability (class now full)"]},
  {level:7,en:27,gains:["+HP per class amount","Raise any one Attribute by +1 (max 3)","May train one NPC contact (spend 1 EN extra)"]},
  {level:8,en:35,gains:["+HP per class amount","Choose one Prestige Skill — any ability from any other class, usable once/session at reduced power"]},
  {level:9,en:44,gains:["+HP per class amount","Raise any one Attribute by +1 (max 3)","+1 AP per session (permanent — now 4/session)"]},
  {level:10,en:54,gains:["+HP per class amount","Earn your Legendary Title","Unlock your Capstone ability"]},
];

export const OUTCOMES = [
  {roll:"6+6",name:"Triumph",color:"#e8b84b",desc:"Two 6s in your pool. Exceptional outcome — narrate a flourish, gain something extra."},
  {roll:"6",name:"Full Success",color:"#5a9a48",desc:"You do exactly what you set out to do, cleanly and completely."},
  {roll:"4–5",name:"Success",color:"#4a7a3a",desc:"You accomplish your goal without complication."},
  {roll:"2–3",name:"Partial",color:"#c8782a",desc:"Success, but at a cost — complication, reduced effect, or new problem."},
  {roll:"1",name:"Failure",color:"#8a2020",desc:"You fail. The GM introduces a consequence, twist, or new threat."},
];

export const CONDITIONS = [
  {name:"Prone",desc:"Cannot act this turn. Action + Agility 4+ to stand. Melee attackers gain +1 against prone targets."},
  {name:"Poisoned",desc:"Lose 1 HP at the start of each of your turns. Roll Brawn 4+ on your turn to end it. Stacks if hit multiple times."},
  {name:"Slowed",desc:"May Move OR take an Action each turn, not both. Lasts until removed or scene changes."},
  {name:"Stunned",desc:"Cannot act on your turn. Roll Wits 4+ at start of your turn to recover."},
  {name:"Blinded",desc:"All rolls involving vision suffer -1d6 (min 1d6). Movement requires Agility 4+ to avoid stumbling."},
  {name:"Frightened",desc:"Must move away from source of fear each turn. Roll Presence 4+ on your turn to overcome."},
  {name:"Rooted",desc:"Cannot move from current zone. Roll Brawn 4+ as an action to break free."},
];

export const LOCATIONS = [
  {name:"The Canopy Cities",enemy:"Rat Baron Enforcers",quest:"The Iron Decree",desc:"Bustling metropolises in the highest branches — now under the Baron's Iron Decree. Taxation posts at every gate, informants in every inn, and a council spy about to deliver a list of resistance members."},
  {name:"The Elder Grove",enemy:"Hollow-Touched Beasts",quest:"The Bleeding Root",desc:"Ten-thousand-year-old trees weeping black sap. Animals return from the corrupted zone mindless and bark-skinned, spreading the Hollow Sickness outward. Someone planted a Baron crystal at the heart of it."},
  {name:"The Nightwood Hollows",enemy:"Owl Court Nobles",quest:"The Feather Tax",desc:"Perpetual twilight lit by bioluminescent moss. The ancient Owl Courts have issued the Feather Tax — one living squirrel per settlement per moon, or face a Hunt. The party has until dawn."},
  {name:"The Sky-Root Peaks",enemy:"Rogue Spirits",quest:"The Untethered Storm",desc:"Mountain-high treetops where Glideborn soar freely. Endless gales from an unbound storm spirit tear settlements apart. The Binding Stones are cracked and the anchor must be repaired."},
  {name:"The Wander-Paths",enemy:"All Factions",quest:"The Last Map",desc:"Unmapped ancient roads between all canopies. A dying cartographer holds the only complete map to Yggdorn, the World Tree. General Scrawl and his Enforcer army are minutes behind."},
];

export const BESTIARY = [
  {name:"Rat Baron Enforcer",hp:10,brawn:2,agility:1,wits:1,armor:"-2 from Iron plate",
    attacks:["Iron Truncheon — 1d6+1, Close, Stuns on Triumph (Wits 4+ resist)","Baron Crossbow — 1d6, Far, 3 shots"],
    abilities:["Rally Rats — signal action: 1d6 Rat Scrubs (HP 2, 1d6 melee) arrive next round","Coordinated Strike — if 2+ Enforcers attack same target, each gains +1d6"],
    tactics:"Stays at crossbow range, two always target the same character. Calls reinforcements when one falls."},
  {name:"Hollow-Touched Beast",hp:12,brawn:3,agility:1,wits:"1 (mindless)",armor:"-1 from Bark hide",
    attacks:["Corrupted Bite — 1d6+1, Close, Wits 4+ or Poisoned (black sap)","Blight Swipe — 1d6, Close, on 6: wooden object in zone becomes Hollow-Touched"],
    abilities:["Mindless Fury — immune to Frightened, Stunned, and all morale effects. Never retreats.","Hollow Burst — on death: spore cloud, all Close characters Wits 4+ or Poisoned"],
    tactics:"Charges nearest character with zero consideration of danger. Fight at range at all costs."},
  {name:"Owl Court Noble",hp:8,brawn:2,agility:3,wits:2,armor:"-1 from Feathered mantle",
    attacks:["Razor Talons — 2d6, Close, Brawn 4+ or knocked Prone","Dive Strike — 3d6, from elevation, ignores all armour, once/combat"],
    abilities:["Silent Dive — move 3 zones and attack as one action, doesn't trigger Predator Sense","Noble Gaze — target Presence 4+ or Frightened 2 rounds","Ancient Pact — once: null one party member's last successful roll completely"],
    tactics:"Opens with Dive Strike, Noble Gazes casters, repositions with Silent Dive. Never surrenders."},
  {name:"Rogue Spirit",hp:6,brawn:1,agility:2,insight:3,armor:"-1 from Ethereal (physical only)",
    attacks:["Spirit Touch — 1d6, Close, ignores all physical armour","Howl — all Near: Wits 4+ or Stunned 1 round, once/combat"],
    abilities:["Phase — once per round: pass through any solid object as a free action","Magic Disruption — Shaman abilities within Near need +1 to succeed (4+ becomes 5+)","Weather Surge — while alive outdoors: weather worsens each round"],
    tactics:"Opens with Howl, phases to the Shaman, uses Magic Disruption to prevent healing. Avoids ritual herbs."},
];

/* ─── STORAGE ────────────────────────────────────────────────────────────── */
export const loadChars = () => {
  try { const raw = localStorage.getItem("acornia-v2"); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
};
export const saveChars = (cs) => {
  try { localStorage.setItem("acornia-v2", JSON.stringify(cs)); } catch {}
};
export const uid = () => Math.random().toString(36).slice(2,10);

/* ─── REMOTE API (Netlify Blobs) ─────────────────────────────────────────── */

const API = "/api/characters";

const isJsonResponse = (res) => (res.headers.get("content-type") || "").includes("application/json");

export const charApi = {
  async list() {
    try {
      const res = await fetch(API);
      if (!res.ok || !isJsonResponse(res)) throw new Error("unavailable");
      return res.json();
    } catch {
      return loadChars();
    }
  },
  async upsert(char) {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(char),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch {
      // persist locally so nothing is lost when offline / in dev
      const cs = loadChars();
      const idx = cs.findIndex((c) => c.id === char.id);
      saveChars(idx >= 0 ? cs.map((c) => (c.id === char.id ? char : c)) : [...cs, char]);
    }
  },
  async remove(id) {
    try {
      const res = await fetch(`${API}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error(await res.text());
    } catch {
      saveChars(loadChars().filter((c) => c.id !== id));
    }
  },
};

/* ─── HELPERS ────────────────────────────────────────────────────────────── */

/** EN required to reach the next level. Returns 9999 at max level. */
export const nextEN = (lv) => {
  const r = LEVEL_TABLE.find(x => x.level === lv + 1);
  return r ? r.en : 9999;
};

/** Array of ability indices (0-based) unlocked at the given level. */
export const abilsUnlocked = (lv) => {
  const u = [0];
  if (lv >= 2) u.push(1);
  if (lv >= 4) u.push(2);
  if (lv >= 6) u.push(3);
  return u;
};

/** Maximum Acorn Points per session at the given level. */
export const getAPMax = (lv) => {
  let a = 2;
  if (lv >= 4) a++;
  if (lv >= 9) a++;
  return a;
};

/** Full max HP calculation used at character creation and after level-ups. */
export const calcMaxHP = (charClass, attrs, level) => {
  const cl = CLASSES[charClass];
  if (!cl) return 6;
  return cl.hpBase + (attrs[cl.coreAttr] || 1) + (level - 1) * cl.hpPerLevel;
};

/** Base attribute block before spending creation points or applying folk modifiers. */
export const getBaseAttrs = (coreAttr) => {
  const b = {brawn:1,agility:1,wits:1,insight:1,presence:1,cunning:1};
  if (coreAttr) b[coreAttr] = 2;
  return b;
};

/**
 * Apply a folk's stat modifier to an attribute block.
 * For Greycoat (anyAttr), pass the player's chosenAttr; without it no mod is applied.
 * All results are clamped to [1, 3].
 */
export const applyFolkMod = (attrs, folkName, chosenAttr) => {
  const folk = FOLK[folkName];
  if (!folk) return attrs;
  const res = {...attrs};
  if (folk.anyAttr) {
    if (chosenAttr) res[chosenAttr] = Math.min(3, (res[chosenAttr] || 1) + 1);
  } else {
    Object.entries(folk.mod || {}).forEach(([k, v]) => {
      res[k] = Math.max(1, Math.min(3, (res[k] || 1) + v));
    });
  }
  return res;
};

/**
 * Compute the HP a character gains when leveling up and return the updated
 * hpMax and hpCurrent. Current HP increases by the per-level amount (not a full heal).
 */
export const applyLevelUp = (char, attrChoice, prestige) => {
  const cl = CLASSES[char.charClass] || {};
  const newLv = char.level + 1;
  const hpGain = cl.hpPerLevel || 0;
  let u = {
    ...char,
    level: newLv,
    hpMax: char.hpMax + hpGain,
    hpCurrent: Math.min(char.hpCurrent + hpGain, char.hpMax + hpGain),
  };
  if (attrChoice) u.attrs = {...u.attrs, [attrChoice]: Math.min(3, (u.attrs[attrChoice] || 1) + 1)};
  if (prestige) u.prestigeSkill = prestige;
  if (newLv === 10) u.legendaryTitle = cl.legendaryTitle || "";
  return u;
};
