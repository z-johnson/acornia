/* ─── LORE COMPENDIUM ────────────────────────────────────────────────────── */

export const IRON_DECREE = {
  preamble: `Issued under the authority of the Five Baron Houses in the third year of the Pacification, by the hand of Baron Aldous Gravel, ratified by General Scrawl and countersigned by the Trade Commission of Acornia.

Let it be known to all folk of the Canopy Settlements and surrounding territories that the following regulations exist for the Preservation of Order, the Protection of Commerce, and the Continued Prosperity of all peoples under Baron administration. Ignorance of these regulations does not exempt any citizen from the penalties prescribed herein. All regulations take effect immediately upon posting. Superseded regulations are void but citizens are advised to retain awareness of them as prior violations may still be prosecuted.

The Iron Decree is a living document. New articles may be added at any time. Citizens are responsible for monitoring the Decree Board in their settlement for updates. Failure to comply with newly posted regulations is not excused by failure to have read the Board.

This document is the property of House Gravel. Unauthorised reproduction is a violation of Article VII, Section 14.`,

  articles: [
    {
      id: "article-i",
      number: "I",
      title: "Commerce & Trade",
      icon: "⚖️",
      color: "var(--gold)",
      preamble: "All commercial activity within Baron-administered territories is subject to regulation by the Trade Commission. The following provisions govern lawful trade.",
      regulations: [
        { num: "1.1", title: "Guild Registration", severity: "standard", text: "All trade guilds operating within any Canopy Settlement must be registered with the local Trade Commission office within thirty days of this Decree taking effect, or within thirty days of the guild's formation, whichever is later. Registration fees are set at 12 Acorns per guild per year. Unregistered guilds are considered unlawful assemblies under Article V." },
        { num: "1.2", title: "Trade Commission Oversight", severity: "standard", text: "Registered guilds must submit to quarterly audits by Trade Commission inspectors. Inspectors have the right to examine all records, stock, and premises. Obstruction of an inspector is a Tier 2 offence." },
        { num: "1.3", title: "Transaction Logging", severity: "standard", text: "All commercial transactions exceeding 5 Acorns in value must be recorded in a Commission-approved ledger. Ledgers must be produced for inspection within one hour of a Commission request. Failure to maintain or produce a ledger is a Tier 2 offence." },
        { num: "1.4", title: "Market Licensing", severity: "standard", text: "Public markets, stalls, and street vendors require a Market Licence, available from the Trade Commission at a fee of 3 Acorns per season. Licences are non-transferable. Operating without a licence is a Tier 2 offence." },
        { num: "1.5", title: "Baron Merchant Priority", severity: "oppressive", text: "In the event that any commercial premises, market stall, or warehouse becomes available within a Canopy Settlement, Baron-affiliated merchants hold right of first refusal for a period of fourteen days. Sellers who bypass this provision to complete transactions with non-Baron parties during the priority window may be compelled to void such transactions by Commission order." },
        { num: "1.6", title: "Price Controls", severity: "oppressive", text: "The Trade Commission reserves the right to set maximum and minimum prices for any goods designated as Essential Commodities. The current list of Essential Commodities is maintained at the Decree Board and subject to change without notice. Selling Essential Commodities outside the Commission-approved price band is a Tier 3 offence." },
        { num: "1.7", title: "Import Tariffs", severity: "standard", text: "All goods entering a Canopy Settlement from outside Baron-administered territory are subject to an import tariff of 20% of declared value. Declared value is subject to Commission review and adjustment. Goods arriving without proper tariff payment will be seized." },
        { num: "1.8", title: "Export Restrictions", severity: "oppressive", text: "The following categories of goods may not be exported from Baron-administered territory without a Commission export permit: Iron goods of all kinds; Timber exceeding personal use quantities; Bark-fibre materials; Ritual items classified under Article IX; Any goods on the Strategic Reserve list as maintained by House Deep. Export permits cost 8 Acorns each and are issued at Commission discretion." },
        { num: "1.9", title: "Currency Regulation", severity: "standard", text: "The Baron Iron Stamp is the official currency of administered territories. All transactions must be conducted in Iron Stamps or in Acorns at the Commission-approved exchange rate, which is updated weekly. Other currencies may be exchanged only at Commission-licensed exchange offices. Use of unauthorised currency in trade is a Tier 2 offence." },
        { num: "1.10", title: "Debt & Credit", severity: "oppressive", text: "Citizens who owe unpaid taxes, fines, or fees to the Trade Commission may be issued a Debt Notice. Debt Notice holders may not conduct commerce, transfer property, or travel beyond their settlement until the debt is cleared. Debt Notices may be transferred to heirs." },
        { num: "1.11", title: "Commission Monopoly Goods", severity: "oppressive", text: "The Trade Commission holds exclusive rights to the distribution of iron tools, crossbow equipment, and all goods manufactured in the Forge Quarter. Individuals found selling or trading these items outside Commission-authorised channels face mandatory Tier 3 penalties." },
        { num: "1.12", title: "Market Hours", severity: "standard", text: "Public markets may operate only between two hours after sunrise and two hours before sunset. Night markets are prohibited under this article and additionally regulated under Article V. Violations are Tier 1 offences for first occurrence, Tier 2 for subsequent." },
      ]
    },
    {
      id: "article-ii",
      number: "II",
      title: "Movement & Travel",
      icon: "🚪",
      color: "var(--orange)",
      preamble: "The orderly movement of citizens between and within settlements is essential to public safety and the maintenance of order. The following provisions regulate movement throughout administered territories.",
      regulations: [
        { num: "2.1", title: "Gate Passes", severity: "standard", text: "All citizens must possess a valid Gate Pass to enter or exit any Canopy Settlement through official gates. Gate Passes are issued by the local Enforcer garrison at a cost of 2 Acorns and are valid for one year. Passes must be carried at all times when travelling and produced upon request by any Enforcer." },
        { num: "2.2", title: "Visitor Registration", severity: "standard", text: "Citizens visiting a settlement other than their registered home settlement must register with the Enforcer garrison within 24 hours of arrival. Visitor registration costs 1 Acorn and grants a 7-day stay. Extensions require a further fee. Unregistered visitors are subject to immediate detention." },
        { num: "2.3", title: "Inter-Canopy Travel", severity: "oppressive", text: "Travel between the five major canopy regions requires an Inter-Canopy Travel Permit, issued by the Trade Commission at a cost of 15 Acorns. Permits are valid for one crossing in each direction and must specify the destination settlement and the purpose of travel. Permits may be denied without explanation." },
        { num: "2.4", title: "Wander-Path Restrictions", severity: "oppressive", text: "Use of the Wander-Paths between canopy regions by non-authorised parties is prohibited. Authorised parties include: Commission-licensed couriers, Enforcer personnel, and holders of Inter-Canopy Travel Permits. Parties found on the Wander-Paths without authorisation are subject to immediate detention and confiscation of all goods and documents." },
        { num: "2.5", title: "Curfew", severity: "standard", text: "All citizens in Canopy Settlements are subject to a curfew from two hours after sunset until one hour before sunrise. Exceptions are granted by written pass from the Enforcer garrison for employment purposes. Citizens found outside their registered dwelling during curfew hours without a curfew pass face Tier 2 penalties." },
        { num: "2.6", title: "Aerial Movement Restrictions", severity: "oppressive", text: "Aerial travel — including but not limited to the use of glide-cloaks, climbing for inter-platform travel, and the use of rope bridges not designated as official crossing points — within or between settlements requires an Aerial Movement Permit. Glideborn folk are additionally required to register their cloaks with the garrison annually at a fee of 5 Acorns. Unregistered aerial travel above or between settlements is a Tier 3 offence." },
        { num: "2.7", title: "Underground Access", severity: "oppressive", text: "Access to underground root-tunnels and any passages leading below the forest floor is prohibited except for Commission-licensed mining operations under House Deep authority. Parties found in underground passages without proper authorisation will be treated as engaged in smuggling or sabotage under Article XI and processed accordingly." },
        { num: "2.8", title: "Mandatory Checkpoints", severity: "standard", text: "The Enforcer garrison may establish mandatory checkpoints at any location within or connecting to a settlement at any time. All persons passing a checkpoint must present their Gate Pass and any relevant travel permits. Refusal to comply is a Tier 3 offence." },
        { num: "2.9", title: "Residency Registration", severity: "standard", text: "All citizens must maintain a registered home address with the settlement's Enforcer garrison. Changes of address must be registered within seven days. Citizens without a registered address may not apply for Gate Passes, Market Licences, or other permits and are subject to detention until residency is established." },
        { num: "2.10", title: "Exile Orders", severity: "severe", text: "The garrison commander may issue an Exile Order compelling a citizen to leave a settlement within 48 hours. Exile Orders may be issued for repeated minor offences, public disorder, or at the garrison commander's discretion for reasons of public safety. Exiled citizens may not return for the duration specified in the Order, which may be permanent. Violation of an Exile Order is a Tier 4 offence." },
      ]
    },
    {
      id: "article-iii",
      number: "III",
      title: "Taxation",
      icon: "🪙",
      color: "var(--gold)",
      preamble: "Taxation is the foundation of administered stability. All citizens are required to contribute to the maintenance of public order and Commission services through the following levies.",
      regulations: [
        { num: "3.1", title: "The Acorn Tithe", severity: "oppressive", text: "All citizens are required to pay an annual Acorn Tithe of 10% of all income, earnings, trade profit, and gifts received during the previous year. The Acorn Tithe is assessed by Trade Commission auditors and must be paid within 30 days of assessment. Disputed assessments must be appealed in writing to the Commission; appeals do not suspend the payment deadline." },
        { num: "3.2", title: "Property Tax", severity: "standard", text: "All citizens who own property — including dwellings, workshop spaces, market stalls, and storage — are subject to annual property tax assessed at 8% of the Commission's determined property value. Citizens may dispute the assessed value; disputes cost 3 Acorns to file and must be resolved before the tax is due." },
        { num: "3.3", title: "Gate Tax", severity: "standard", text: "In addition to the Gate Pass fee under Article 2.1, citizens entering a settlement from outside are subject to a per-entry Gate Tax of 1 Acorn. Commission couriers and garrison personnel are exempt. Bulk goods entering a settlement are subject to the import tariff under Article 1.7 in addition to the Gate Tax." },
        { num: "3.4", title: "Professional Tax", severity: "oppressive", text: "All citizens engaged in any profession requiring a licence, certification, or guild membership are subject to a Professional Tax of 5 Acorns per year, in addition to any licensing fees. This includes but is not limited to: traders, smiths, healers, messengers, shamans, and skilled artisans. Unlicensed practice of a profession does not exempt a citizen from the Professional Tax if the Commission determines the activity constitutes professional work." },
        { num: "3.5", title: "Inheritance Levy", severity: "oppressive", text: "Upon the death of any citizen, all property and holdings passed to heirs are subject to an Inheritance Levy of 15%. The levy must be paid within 60 days of the citizen's death. Unpaid levies become a lien on the inherited property, which the Commission may seize after a further 30-day notice period." },
        { num: "3.6", title: "The Protection Fee", severity: "severe", text: "Settlements with a resident Enforcer garrison are assessed a quarterly Protection Fee to offset the cost of maintaining order. The fee is calculated per household and may not be reduced by appeal. The Protection Fee is separate from all other taxes and is non-negotiable. Failure to pay the Protection Fee within 14 days of assessment results in a Debt Notice under Article 1.10." },
        { num: "3.7", title: "Folk Supplementary Assessments", severity: "severe", text: "The following supplementary annual taxes apply by folk designation as determined by the Trade Commission: Glideborn citizens (Aerial Supplement): 8 Acorns per year; Shadowtail citizens (Transparency Supplement): 6 Acorns per year; Redpelt citizens residing within city limits (Urban Residency Supplement): 4 Acorns per year. These supplements reflect the additional administrative resources required to process the particular circumstances of these folk. Appeals are not accepted on the grounds that the supplement is discriminatory." },
        { num: "3.8", title: "Tax Informant Incentive", severity: "severe", text: "Citizens who report tax evasion by other citizens that results in a successful Commission recovery will receive 10% of the recovered amount as a finder's fee. Informant identities are protected. False reports are a Tier 2 offence." },
        { num: "3.9", title: "Emergency Assessment", severity: "oppressive", text: "In times of public emergency as declared by the garrison commander or the Trade Commission, an Emergency Assessment of up to 25% of all citizen holdings may be levied. Emergency Assessments are not subject to appeal. Emergency declarations do not require specific conditions to be met beyond the judgement of the declaring authority." },
        { num: "3.10", title: "Non-Payment Consequences", severity: "severe", text: "Citizens who fail to pay any tax within the specified period are subject to compounding penalties of 5% of outstanding amount per week. After 90 days of non-payment, the Commission may seize property to the value of the outstanding tax plus penalties. After 180 days, the citizen may be assigned to a Commission Labour Detail (see Article VI, Section 6.8) until the debt is cleared." },
      ]
    },
    {
      id: "article-iv",
      number: "IV",
      title: "Information & Communication",
      icon: "📜",
      color: "var(--teal)",
      preamble: "The free flow of accurate information is a cornerstone of public order. The following provisions prevent the spread of misleading, seditious, or destabilising communications throughout administered territories.",
      regulations: [
        { num: "4.1", title: "Commission Postal Authority", severity: "oppressive", text: "The Trade Commission holds exclusive authority over the official postal service within administered territories. Private courier operations must be licensed by the Commission at a cost of 10 Acorns per year. Licensed couriers must carry all their correspondence in unsealed form or in Commission-standard sealed envelopes that may be inspected at any checkpoint. Unlicensed courier operations are a Tier 3 offence." },
        { num: "4.2", title: "Document Reproduction", severity: "oppressive", text: "The reproduction, copying, or printing of any document in quantities exceeding five copies requires a Commission Printing Licence, available at 8 Acorns per year. Licensed printing operations are subject to Commission inspection. All printed materials exceeding five copies must bear the printer's licence number. Unlicensed reproduction is a Tier 3 offence. Reproduction of Commission documents, Decree materials, or official notices is prohibited without explicit written permission." },
        { num: "4.3", title: "Public Announcements", severity: "oppressive", text: "Public announcements, posted notices, and public communications addressed to more than ten people require prior Commission approval. Submissions for approval must be made at the garrison office at least 48 hours before intended posting. Unapproved public communications are a Tier 2 offence for first occurrence." },
        { num: "4.4", title: "Seditious Material", severity: "severe", text: "The creation, possession, distribution, or display of any material deemed seditious by the garrison commander is a Tier 4 offence. Seditious material includes: written or pictorial content criticising Baron administration; content advocating non-compliance with the Iron Decree; content glorifying resistance activities; content that could, in the garrison commander's judgement, incite disorder. The determination of what constitutes seditious material is at the garrison commander's sole discretion and is not subject to appeal." },
        { num: "4.5", title: "Messenger Registration", severity: "standard", text: "All individuals who regularly carry messages between parties — including unofficial couriers, personal messengers, and those employed to deliver correspondence — must register as messengers with the garrison. Registration is 2 Acorns per year. Registered messengers may be required to produce their carried correspondence for inspection at any checkpoint." },
        { num: "4.6", title: "Aerial Message Carriers", severity: "oppressive", text: "Glideborn operating as message carriers, including the so-called 'Sky Speaker' network, must obtain an Aerial Communication Permit in addition to all standard courier licensing requirements. Aerial Communication Permits are 20 Acorns per year and require disclosure of all regular routes. The Commission reserves the right to deny permits to any applicant whose routes it deems to conflict with public order. Operating an aerial courier service without an Aerial Communication Permit is a Tier 4 offence." },
        { num: "4.7", title: "Foreign Correspondence", severity: "severe", text: "Written correspondence sent to or received from individuals in non-administered territories — including the Sky-Root Peaks, the Nightwood Hollows (Owl Court territories), and the Wander-Paths — must be declared to the garrison and is subject to inspection. Undeclared foreign correspondence is a Tier 3 offence. The garrison may copy, withhold, or destroy foreign correspondence that poses a public order concern." },
        { num: "4.8", title: "Rumour & Misinformation", severity: "oppressive", text: "The deliberate spreading of false or misleading information regarding Baron administration, Trade Commission activities, Enforcer conduct, or the state of public order is a Tier 3 offence. The Commission's determination of whether information is false or misleading is authoritative. Honest mistake is not a defence if the speaker had reasonable means to verify the information." },
      ]
    },
    {
      id: "article-v",
      number: "V",
      title: "Assembly & Association",
      icon: "👥",
      color: "var(--purple)",
      preamble: "The right of citizens to associate freely is recognised within the limits necessary for public order. The following provisions define lawful assembly and association.",
      regulations: [
        { num: "5.1", title: "Gathering Limits", severity: "standard", text: "Gatherings of more than ten citizens in a public or semi-public space — including market squares, common areas, bridges, and inn common rooms — are subject to Assembly Provisions. Such gatherings require a Gathering Notice submitted to the garrison 24 hours in advance. Ungathered assemblies of more than ten persons may be dispersed by Enforcer order. Failure to disperse on order is a Tier 2 offence per person who remains." },
        { num: "5.2", title: "Prohibited Assemblies", severity: "severe", text: "The following types of assembly are prohibited regardless of size: gatherings whose stated or apparent purpose is to criticise, oppose, or organise resistance to Baron administration; gatherings involving the discussion or planning of collective non-compliance with the Iron Decree; gatherings involving unlicensed political activity; gatherings that the garrison commander determines to pose a public order risk. Participation in a prohibited assembly is a Tier 4 offence." },
        { num: "5.3", title: "Registered Associations", severity: "oppressive", text: "Any organised group of five or more citizens that meets regularly — including social clubs, craft circles, study groups, religious organisations, and neighbourhood associations — must register as an Association with the garrison. Registration requires submission of member names, meeting times, meeting locations, and the stated purpose of the association. Registration costs 5 Acorns per year. Unregistered associations operating for more than 30 days are considered unlawful assemblies." },
        { num: "5.4", title: "Political Activity", severity: "severe", text: "The organisation, funding, or promotion of any political activity not formally sanctioned by the Trade Commission or the garrison is prohibited. Political activity includes: campaigns to change the Iron Decree; elections or votes on matters of public governance; the formation of advisory councils or citizen committees without Commission authorisation; and any organised effort to influence policy through collective action. Political activity violations are Tier 4 offences." },
        { num: "5.5", title: "Former Councils", severity: "severe", text: "Pre-existing citizen councils, trade councils, and community governance bodies not formally reconstituted under Commission authority are dissolved as of the date of this Decree. Former council members who continue to exercise council functions are in violation of this provision. The formation of informal councils — including what the resistance refers to as the 'Free Canopy Council' — is explicitly prohibited. Participation in dissolved or informal councils is a Tier 4 offence." },
        { num: "5.6", title: "Night Markets", severity: "oppressive", text: "Markets, trading, and social gatherings operating outside the hours specified in Article 1.12 constitute unlawful night markets. Night markets are additionally in violation of curfew provisions under Article 2.5. Operators of night markets face Tier 3 penalties. Participants face Tier 2 penalties. The garrison may conduct raids on suspected night market locations without prior notice or warrant." },
        { num: "5.7", title: "Religious & Ritual Gatherings", severity: "oppressive", text: "Religious observances and ritual gatherings must be registered under Article 5.3 and additionally declare the nature of the ritual or observance. Rituals involving more than five participants require a separate Ritual Permit under Article IX. The Commission reserves the right to deny registration to organisations whose practices conflict with public order." },
        { num: "5.8", title: "Garrison Attendance", severity: "oppressive", text: "The garrison may assign an observer to any registered gathering of more than fifteen persons. The presence of a garrison observer does not affect the status of the gathering. Attempting to exclude, mislead, or impede a garrison observer is a Tier 3 offence." },
      ]
    },
    {
      id: "article-vi",
      number: "VI",
      title: "Property & Housing",
      icon: "🏠",
      color: "var(--teal)",
      preamble: "Stable property arrangements are the foundation of orderly administration. The following provisions govern property ownership, use, and transfer within administered territories.",
      regulations: [
        { num: "6.1", title: "Property Registration", severity: "standard", text: "All property within administered territories must be registered with the Trade Commission. Property registration is mandatory and free of charge; however, unregistered property is considered to have no legal owner and may be claimed by the Commission. Citizens have 60 days from the effective date of this Decree to register existing property holdings." },
        { num: "6.2", title: "Non-Citizen Ownership", severity: "oppressive", text: "Non-citizens and non-residents may not hold property within a Canopy Settlement without a Commission Property Permit, which costs 20 Acorns and is subject to annual renewal. The Commission may revoke a Property Permit at any time, in which case the property holder has 30 days to sell or transfer the property. Failure to transfer within this period results in Commission seizure." },
        { num: "6.3", title: "Property Transfer", severity: "standard", text: "All property transfers — including sales, gifts, inheritance, and lease arrangements exceeding one year — must be recorded with the Commission within 14 days. Transfers not recorded within this period are invalid and the property reverts to its last registered holder. Transfers involving unresolved tax debts or Debt Notices under Article 1.10 are void until debts are cleared." },
        { num: "6.4", title: "Commission Right of Acquisition", severity: "severe", text: "The Trade Commission may acquire any property within administered territory for purposes of public administration, garrison use, or Commission operations upon payment of the Commission's assessed value of the property. The Commission's assessed value may not be appealed. Owners must vacate within 14 days of an Acquisition Notice. Failure to vacate is a Tier 3 offence." },
        { num: "6.5", title: "Property Use Restrictions", severity: "oppressive", text: "The following uses of private property are prohibited without a Commission Special Use Permit: Operating any unlicensed commercial activity; Providing shelter to individuals with outstanding Exile Orders, Detention Warrants, or who are otherwise known to be in violation of the Iron Decree; Storing goods in quantities exceeding personal use without a licensed warehouse operation." },
        { num: "6.6", title: "Search & Entry", severity: "severe", text: "Enforcer personnel may enter and search any premises, public or private, upon reasonable suspicion of a Decree violation. No warrant is required. Refusal to admit Enforcer personnel to a premises is itself a Tier 3 offence. Enforcers may seize any items believed to be connected to a violation. Seized items may be reclaimed upon payment of a processing fee; the processing fee is non-refundable even if no violation is ultimately found." },
        { num: "6.7", title: "Hollowstone Sites", severity: "severe", text: "Any premises that contain, are adjacent to, or are built near Commission-designated Hollowstone Infrastructure are subject to mandatory access rights for House Deep personnel. Citizens may not interfere with, approach within one zone of, or remove, damage, or obstruct any Hollowstone Infrastructure. Interference with Hollowstone Infrastructure is a Tier 4 offence. Citizens adversely affected by proximity to Hollowstone Infrastructure have no claim for compensation or relocation assistance." },
        { num: "6.8", title: "Commission Labour Details", severity: "severe", text: "Citizens assigned to Commission Labour Details under Article 3.10 or as a penalty under Article XI are required to perform work on Commission-directed projects, which may include construction, maintenance, or transport. Labour Detail assignment is not considered imprisonment. Labour Detail participants must report to the garrison each morning and return by curfew. Failure to report is a Tier 3 offence." },
      ]
    },
    {
      id: "article-vii",
      number: "VII",
      title: "Employment & Labour",
      icon: "🔨",
      color: "var(--orange)",
      preamble: "Productive employment benefits all citizens and the administration alike. The following provisions ensure the orderly conduct of labour within administered territories.",
      regulations: [
        { num: "7.1", title: "Work Permits", severity: "standard", text: "All citizens engaged in employment, trade, craft, or any commercial activity must possess a valid Work Permit for the type of work performed. Work Permits are issued by the garrison and cost 3 Acorns per year. Work Permits specify the type of work permitted; performing work outside the specified type requires a separate permit. Operating without a Work Permit is a Tier 2 offence." },
        { num: "7.2", title: "Guild Membership Requirements", severity: "oppressive", text: "Citizens wishing to practice certain designated professions must belong to the relevant Commission-registered guild for that profession. The list of designated professions requiring guild membership is maintained at the Decree Board. Guild membership fees are set by the guild but subject to Commission approval. Non-guild practitioners of designated professions are practicing illegally regardless of their Work Permit status." },
        { num: "7.3", title: "Employment of Baron Nationals", severity: "oppressive", text: "Any employer with more than five employees is required to offer employment to qualified Baron nationals before filling any position with non-Baron applicants. Baron nationals who accept employment offers supersede existing non-Baron employees if the employer cannot afford to maintain all positions. This provision may not be waived except by Trade Commission exemption." },
        { num: "7.4", title: "Minimum Labour Obligation", severity: "severe", text: "All citizens of working age — defined as between 14 and 70 years — who are not employed, not enrolled in registered education, and not caring for dependents are subject to the Minimum Labour Obligation of 20 days of Commission-directed work per year. Citizens who have not completed their annual obligation by the final month of the year will be assigned to a Commission Labour Detail to fulfil the remainder." },
        { num: "7.5", title: "Wage Controls", severity: "oppressive", text: "The Commission may set maximum wage rates for any occupation in order to maintain economic stability. Current maximum rates are posted at the Decree Board. Payment above the maximum wage rate is a violation by the employer; the excess must be returned to the Commission. Employees who knowingly accept above-maximum wages are also in violation." },
        { num: "7.6", title: "Shaman & Healer Registration", severity: "oppressive", text: "Shamans, herbalists, healers, and all persons providing medical or spiritual services must register with the garrison as Health and Ritual Practitioners. Registration costs 6 Acorns per year. Registered practitioners must report to the garrison any case of Hollow Sickness encountered in their practice. Failure to report Hollow Sickness is a Tier 3 offence." },
        { num: "7.7", title: "Commission Priority Employment", severity: "severe", text: "The Commission may compel any citizen with specific skills — including but not limited to smithing, shaman practice, courier experience, and cartography — to perform Commission-directed work for a period of up to 90 days per year. Compelled workers receive standard Labour Detail rates. Refusal of Commission Priority Employment is a Tier 3 offence." },
        { num: "7.8", title: "Strikes & Work Stoppages", severity: "severe", text: "Coordinated refusal to work — including strikes, work-to-rule actions, and slowdowns planned or executed by two or more employees — is prohibited as a form of collective action under Article V. Participants in work stoppages are subject to Tier 3 penalties. Employers who encourage, facilitate, or fail to prevent work stoppages on their premises are subject to Tier 2 penalties." },
        { num: "7.9", title: "Prohibition of Competing Documents", severity: "oppressive", text: "The reproduction, distribution, or display of documents purporting to set workers' rights, collective agreements, or terms of employment that contradict the Iron Decree is prohibited under Article IV, Section 4.4. Guild documents that predate the Decree are void insofar as they conflict with current regulations." },
        { num: "7.10", title: "Informant Employment", severity: "severe", text: "Citizens who provide information to the garrison resulting in successful prosecution of Decree violations are eligible for a Special Employment Status exempting them from the Minimum Labour Obligation, the Professional Tax, and one Folk Supplementary Assessment. Informant status is renewable annually at the garrison's discretion." },
      ]
    },
    {
      id: "article-viii",
      number: "VIII",
      title: "Weapons & Combat",
      icon: "⚔️",
      color: "var(--red2)",
      preamble: "The safety of all citizens depends on proper regulation of weapons and combat activities. These provisions govern the possession, use, and registration of all weapons within administered territories.",
      regulations: [
        { num: "8.1", title: "Weapon Registration", severity: "standard", text: "All weapons — defined as any implement primarily designed for use against other persons, including but not limited to blades, clubs, bows, slings, and thrown weapons — must be registered with the Enforcer garrison. Registration costs 2 Acorns per weapon per year. Weapons must bear the garrison's registration mark. Possession of an unregistered weapon is a Tier 3 offence." },
        { num: "8.2", title: "Iron Weapon Restrictions", severity: "severe", text: "Iron weapons — including iron-edged blades, iron-tipped arrows, and iron-reinforced clubs — may only be owned by Baron nationals, current Enforcer personnel, and Commission-licensed guards. Non-authorised possession of an iron weapon is a Tier 4 offence. This provision is not negotiable regardless of previous ownership or registration status." },
        { num: "8.3", title: "Crossbow Control", severity: "severe", text: "Crossbows and crossbow ammunition are Commission-controlled items under Article 1.11. They may not be owned, purchased, or possessed by private citizens. Crossbows found on private premises are subject to immediate seizure. Possession of a crossbow is a Tier 4 offence." },
        { num: "8.4", title: "Public Carrying", severity: "oppressive", text: "Registered weapons may be carried publicly only in scabbards, sheaths, or other covered carry arrangements. Drawing a weapon in a public space without immediate cause for self-defence is a Tier 2 offence. What constitutes 'immediate cause' is determined by the responding Enforcer. Carrying an unregistered weapon publicly is a Tier 3 offence." },
        { num: "8.5", title: "Self-Defence Limitations", severity: "oppressive", text: "Self-defence is recognised as a legal justification for weapon use only in cases where: the threat was immediate and life-threatening; the citizen had no practical means of retreat; the garrison could not have been called in time. Self-defence claims are assessed by the garrison commander. Citizens who use weapons in situations not meeting these criteria are subject to penalties under standard assault provisions, regardless of provocation." },
        { num: "8.6", title: "Weapon Storage", severity: "standard", text: "Registered weapons not being carried must be stored in locked containment on the registered owner's premises. Weapons accessible to non-registered household members are considered improperly stored. A weapons storage inspection may be conducted at any time under Article 6.6." },
        { num: "8.7", title: "Combat Training", severity: "oppressive", text: "Combat training — including organised sparring, weapons instruction, and martial exercises — requires a Training Permit from the garrison. Group combat training involving more than three persons additionally requires an Assembly Notice under Article 5.1. Unlicensed combat training is a Tier 3 offence. Unlicensed combat training involving more than ten persons is a Tier 4 offence." },
        { num: "8.8", title: "Trap & Snare Restrictions", severity: "standard", text: "Traps and snares placed in public areas, common spaces, or areas through which Enforcer patrols operate are prohibited. Personal property traps must be clearly marked. Traps of the type described in the Night Guild's known operational playbook — spring-loaded, concealed, or multi-stage — are prohibited regardless of location. Violation is a Tier 3 offence." },
        { num: "8.9", title: "Weapons Surrender Protocol", severity: "severe", text: "The garrison commander may order a weapons collection in any area of a settlement at any time. Citizens in the designated area must surrender all weapons within the specified timeframe. Surrendered weapons are inventoried and may be reclaimed after the collection period upon payment of a 1 Acorn re-registration fee. Failure to surrender weapons during a collection is a Tier 4 offence." },
      ]
    },
    {
      id: "article-ix",
      number: "IX",
      title: "Magic, Ritual & Spiritual Practice",
      icon: "✨",
      color: "var(--purple)",
      preamble: "Spiritual and magical activities require careful regulation to ensure public safety and the orderly functioning of the natural world. These provisions govern all ritual, spiritual, and magical practices within administered territories.",
      regulations: [
        { num: "9.1", title: "Shaman Licensing", severity: "oppressive", text: "All individuals practicing shamanism — defined as the performance of rituals, spirit communion, nature magic, healing through ritual means, or any activity that interacts with the spiritual dimension of the natural world — must hold a Commission Shaman Licence. Shaman Licences cost 10 Acorns per year and require annual renewal. Licensed shamans are subject to Commission oversight of their practice." },
        { num: "9.2", title: "Ritual Registration", severity: "oppressive", text: "All rituals involving more than five participants must be registered with the garrison under Article 5.7. Single-practitioner rituals do not require registration but are subject to reporting requirements under Section 9.5. Rituals that the garrison determines to involve spirit-binding, weather manipulation, or the weakening or destruction of Hollowstone Infrastructure (see Article 6.7) are prohibited under Section 9.8 regardless of licensing." },
        { num: "9.3", title: "Herb & Compound Regulation", severity: "oppressive", text: "Ritual herbs, healing compounds, and substances that interact with the spiritual dimension — including anti-Hollow preparations and spirit-repellents — are classified as Regulated Substances. Their sale and distribution requires a Regulated Substance Licence, which costs 8 Acorns per year. Production of Regulated Substances for personal use is permitted but stockpiling exceeding 30 days' personal use is not. Export of Regulated Substances requires a Commission permit under Article 1.8." },
        { num: "9.4", title: "Spirit Drums & Focus Items", severity: "standard", text: "Spirit drums, ritual focuses, bone-rune equipment, and similar items used in shaman practice must be registered alongside the practitioner's Shaman Licence. Unregistered ritual items may be seized during any property inspection. Items belonging to unlicensed practitioners are subject to permanent confiscation." },
        { num: "9.5", title: "Mandatory Reporting", severity: "severe", text: "Licensed shamans must report to the garrison: any observation or detection of Hollow Sickness or Hollow-Touched beasts within or approaching the settlement; any spirit activity that may affect public order; any ritual that produces significant observable effects; any request for ritual services related to anti-Hollow work. Failure to report these events within 24 hours of their occurrence is a Tier 3 offence." },
        { num: "9.6", title: "Palewhisker Registration", severity: "severe", text: "All individuals of Palewhisker folk within administered territories must register with the garrison as Special Practitioners. Special Practitioners are required to report their location to the garrison weekly, to submit to quarterly assessments of their abilities by a Commission-appointed evaluator, and to make their services available to the garrison upon request. Non-compliance with any Special Practitioner requirement is a Tier 4 offence. Palewhiskers who fail to register within 30 days of this Decree's effective date are considered to be operating in concealment, which carries additional penalties." },
        { num: "9.7", title: "Forecasting & Portents", severity: "oppressive", text: "Public performance of divination, fortune-telling, portent-reading, or any activity that claims to predict future events is prohibited without a Commission Forecasting Permit. Forecasting Permits cost 5 Acorns and require the practitioner to submit all readings to the garrison for review prior to sharing them with the client. Private readings between a licensed shaman and a client are permitted but the garrison reserves the right to request records of any reading." },
        { num: "9.8", title: "Prohibited Ritual Activities", severity: "severe", text: "The following ritual activities are prohibited regardless of licensing status: Spirit-binding or spirit-unbinding; Rituals directed at Hollowstone Infrastructure or designed to disrupt, weaken, or destroy Hollowstone; Yggdorn communion attempts or rituals using Yggdorn Fragment materials in ways designed to restore or reconnect Yggdorn's spiritual network; Weather manipulation without explicit Commission authorisation. Violations of this section are Tier 4 offences." },
        { num: "9.9", title: "Hollowstone Non-Interference", severity: "severe", text: "Hollowstone and Hollowstone Infrastructure are designated protected materials under this Decree and under the exclusive authority of House Deep. Any ritual, shaman practice, or spiritual activity that interacts with Hollowstone — whether to study it, disrupt it, neutralise it, or remove it — is prohibited. Shamans who detect Hollow Sickness must report it (per Section 9.5) but may not independently attempt remediation without explicit written authorisation from House Deep." },
        { num: "9.10", title: "Commission Ritual Authority", severity: "oppressive", text: "The Trade Commission may commission ritual services from any licensed shaman at standard market rates as set by the Commission. Shamans may not decline a Commission commission on grounds of personal belief, conflicting obligations, or safety concerns. Commission ritual work takes precedence over all private contracts." },
      ]
    },
    {
      id: "article-x",
      number: "X",
      title: "Folk-Specific Provisions",
      icon: "🐿️",
      color: "var(--orange)",
      preamble: "The diverse folk of Acornia have unique characteristics that require specific regulatory attention. The following provisions supplement the general Decree articles and apply to designated folk as specified.",
      regulations: [
        { num: "10.1", title: "Universal Folk Documentation", severity: "standard", text: "All citizens must carry and produce upon request documentation of their folk designation. Folk designation is recorded on the Gate Pass. Citizens whose folk designation is disputed or unclear — including those of mixed heritage — must obtain a Commission Folk Assessment at a cost of 4 Acorns. The Commission's folk designation determination is final." },
        { num: "10.2", title: "Greycoat Administrative Obligations", severity: "oppressive", text: "Greycoat citizens with prior experience in guild administration, city council service, postal operations, or Trade Commission equivalents are subject to Commission Priority Employment under Article 7.7 as standard annual practice rather than on an exceptional basis. Greycoat administrators who held positions in the pre-Decree governance structure must complete a Commission Re-Orientation before practising in any related field." },
        { num: "10.3", title: "Redpelt Territory Restrictions", severity: "oppressive", text: "Redpelt citizens residing in or visiting Canopy Settlements from the Elder Grove region must carry a Region of Origin documentation in addition to standard Gate Pass requirements. Redpelt citizens are prohibited from entering the Forge Quarter, the Hollowstone storage facilities, and a 50-metre perimeter around any Hollowstone Infrastructure without explicit written garrison authorisation. Redpelt citizens in groups of more than three in a public space are subject to Assembly Provisions under Article 5.1 regardless of the group's size relative to the general limit." },
        { num: "10.4", title: "Shadowtail Identification", severity: "severe", text: "Shadowtail citizens are required to carry a Shadowtail Identification Certificate — a document distinct from the standard Gate Pass — which includes a description, any distinguishing marks, and the citizen's registered home address. Shadowtail citizens must register any change of address within 24 hours rather than the standard 7 days. Shadowtail citizens are prohibited from being present in: garrison premises, Commission counting houses, Hollowstone storage facilities, or within 30 metres of the garrison commander's quarters at any time. Violation of location restrictions is a Tier 3 offence." },
        { num: "10.5", title: "Glideborn Cloak Restrictions", severity: "oppressive", text: "In addition to standard Aerial Movement Permit requirements under Article 2.6, Glideborn citizens may not use their glide-cloaks within Canopy Settlement boundaries except in Commission-designated landing areas. Extended gliding — defined as any aerial traverse covering more than two settlement platforms — requires prior filing of a flight plan with the garrison. Glideborn observed flying without a filed flight plan may be subject to immediate crossbow deterrence at Enforcer discretion." },
        { num: "10.6", title: "Palewhisker Special Conditions", severity: "severe", text: "In addition to Special Practitioner registration under Article 9.6, Palewhisker citizens are prohibited from leaving their registered settlement without an Accompanied Travel Order — an authorisation requiring them to travel with a garrison escort at a cost of 8 Acorns per day. Unaccompanied Palewhisker travel between settlements is a Tier 4 offence. Palewhiskers found outside administered territories without documentation are subject to immediate detention and transport to the nearest House Vox processing facility." },
        { num: "10.7", title: "Non-Squirrel Folk", severity: "standard", text: "Non-squirrel-kind folk — including fungi-folk, deep tunnel inhabitants, and any other non-designated peoples — have no official status under this Decree and are therefore subject to no protections within it. Their presence in administered territories is tolerated at the garrison's discretion. The Commission may designate any non-squirrel folk group as a registered population, granting them folk status and associated obligations, at any time." },
        { num: "10.8", title: "Folk Designation Appeals", severity: "oppressive", text: "Citizens who dispute their folk designation may appeal to the Commission. Appeals cost 6 Acorns. The Commission may require physical examination and written testimony. The Commission's designation is final and not subject to further appeal. Citizens who provide false folk designation information — including claiming a folk status to avoid folk-specific provisions — face Tier 4 penalties." },
      ]
    },
    {
      id: "article-xi",
      number: "XI",
      title: "Enforcement Powers",
      icon: "🛡️",
      color: "var(--red2)",
      preamble: "The Enforcer garrison is the instrument of Baron authority within administered territories. The following provisions define the powers and procedures of Enforcer operations.",
      regulations: [
        { num: "11.1", title: "Enforcer Authority", severity: "standard", text: "Enforcer personnel acting in the performance of their duties have authority over all citizens within administered territories regardless of folk designation, social status, or previous community standing. Citizens are required to comply with all lawful Enforcer instructions promptly. The determination of whether an instruction is lawful rests with the Enforcer giving it, subject to after-the-fact garrison review." },
        { num: "11.2", title: "Detention Powers", severity: "oppressive", text: "Enforcer personnel may detain any citizen for up to 72 hours without formal charges on grounds of suspected Decree violation, public order risk, or failure to produce required documentation. Detention may be extended by garrison commander order in 72-hour increments. There is no maximum detention period for citizens suspected of Tier 4 offences." },
        { num: "11.3", title: "Search & Seizure", severity: "oppressive", text: "Enforcer personnel may search any person or premises upon reasonable suspicion, which is defined as the Enforcer's professional judgement that a violation may be occurring. No warrant, notice, or secondary authorisation is required. Seized items are logged and held by the garrison. Return of seized items upon clearance of suspicion is not automatic; citizens must apply for return at a 1 Acorn processing fee per item." },
        { num: "11.4", title: "Use of Force", severity: "severe", text: "Enforcers may use reasonable force to: compel compliance with lawful instructions; prevent flight by suspected violators; respond to resistance or obstruction; protect garrison personnel or Commission property. What constitutes 'reasonable force' is determined by the garrison commander in post-incident review. Enforcers who use force in performance of their duties are presumed to have acted reasonably unless clear evidence to the contrary exists." },
        { num: "11.5", title: "Informant Protection", severity: "oppressive", text: "Citizens who provide information to the garrison have their identities protected under Commission authority. No Freedom of Information claim, legal proceeding, or citizen petition may compel the garrison to reveal informant identities. Attempting to identify, harass, harm, or obstruct a garrison informant is a Tier 4 offence, which carries mandatory Labour Detail in addition to standard penalties." },
        { num: "11.6", title: "Enforcer Complaint Procedure", severity: "severe", text: "Citizens who believe they have been subject to improper Enforcer conduct may submit a complaint to the garrison commander in writing within 14 days of the incident. Complaints cost 2 Acorns to file. The garrison commander's review of the complaint is final. Complaints found to be frivolous or made in bad faith are themselves Tier 1 offences. Statistics on complaint outcomes are not public information." },
        { num: "11.7", title: "External Enforcement Cooperation", severity: "oppressive", text: "The Enforcer garrison may request and receive enforcement assistance from Owl Court security personnel under the inter-faction agreement with House Gilt. Citizens subject to enforcement action by Owl Court personnel operating in cooperation with the garrison have the same obligations as when facing Enforcer personnel. Owl Court enforcement actions are subject to this Decree's provisions and to Owl Court law simultaneously." },
        { num: "11.8", title: "Rally Protocol", severity: "severe", text: "In the event of public disorder, organised resistance activity, or attack on garrison personnel or Commission property, the garrison may invoke the Rally Protocol, which: suspends standard detention time limits; authorises immediate area-wide curfew; permits detention of any person in the affected area without individual suspicion; and authorises the requisition of private premises for garrison use under Article 6.4. Rally Protocols may remain in effect for up to 30 days or until the commander determines order is restored." },
      ]
    },
    {
      id: "article-xii",
      number: "XII",
      title: "Penalties & Punishments",
      icon: "⚖️",
      color: "var(--red2)",
      preamble: "Penalties under the Iron Decree are calibrated to deter violation while ensuring continued civic participation. The following tiers of penalty apply as specified throughout this Decree.",
      regulations: [
        { num: "12.1", title: "Tier 1 — Minor Infraction", severity: "standard", text: "Tier 1 offences result in: A warning recorded in the citizen's garrison file; A fine of 2–5 Acorns at garrison discretion; No additional consequence for first occurrence. Tier 1 offences that accumulate — three or more within one year — are automatically escalated to Tier 2 treatment at the garrison commander's discretion." },
        { num: "12.2", title: "Tier 2 — Standard Offence", severity: "standard", text: "Tier 2 offences result in: A fine of 5–20 Acorns at garrison discretion; Entry in the citizen's permanent garrison record; Loss of one licence or permit at garrison discretion; Optional: 5–15 days of Commission Labour Detail in lieu of fine. Citizens with three or more Tier 2 offences within two years may be subject to enhanced monitoring, which includes weekly garrison check-ins and reduced travel permissions." },
        { num: "12.3", title: "Tier 3 — Serious Offence", severity: "oppressive", text: "Tier 3 offences result in: A fine of 20–80 Acorns at garrison discretion; Confiscation of relevant items or materials; Suspension of Gate Pass and travel permissions for up to 90 days; 30–90 days Commission Labour Detail, concurrent with or in addition to fine; Possible Exile Order under Article 2.10. Tier 3 offences are noted permanently in the citizen's file and may affect future permit applications." },
        { num: "12.4", title: "Tier 4 — Severe Offence", severity: "severe", text: "Tier 4 offences result in: Indefinite detention pending garrison commander review; A fine of 100 Acorns or more, or full asset seizure in cases where the fine cannot be paid; Permanent Exile Order from the settlement; Mandatory referral to House Vox for cases involving information or resistance activities; In cases involving violence against Enforcer personnel, Commission property, or Hollowstone Infrastructure: trial under Baron Military Law, with penalties up to and including permanent banishment from all administered territories." },
        { num: "12.5", title: "Collective Penalty", severity: "severe", text: "In cases where a Decree violation appears to involve multiple persons and individual perpetrators cannot be identified, the garrison may impose a Collective Penalty on the household, registered association, or settlement district within which the violation occurred. Collective Penalties may include community fines, increased Protection Fees (Article 3.6), or temporary restriction of privileges for the affected group. Individuals in the affected group who provide information identifying the specific violators will be excluded from the Collective Penalty." },
        { num: "12.6", title: "Repeat Offender Protocol", severity: "severe", text: "Citizens with five or more offences of any tier within a three-year period are designated Persistent Violators. Persistent Violators are subject to: Enhanced monitoring; Pre-approval requirements for travel, trade, and association; A Persistent Violator Supplement to their annual tax assessment of 10 Acorns; Mandatory quarterly garrison interviews. Persistent Violator status persists until three years pass without any further violations." },
        { num: "12.7", title: "Rewards for Information", severity: "oppressive", text: "In addition to the Tax Informant Incentive under Article 3.8 and Informant Employment under Article 7.10, the garrison maintains a standing reward schedule for information relating to: Active resistance organisation leaders (50 Acorns); Locations of unlicensed gatherings of more than ten persons (10 Acorns); Locations of unlicensed couriers or Sky Speaker network access points (15 Acorns); Confirmed Palewhisker in concealment (25 Acorns); Any information leading to the seizure of seditious materials or anti-Hollow compounds (10 Acorns per instance)." },
        { num: "12.8", title: "Amendments & Retroactivity", severity: "severe", text: "New provisions added to the Iron Decree take effect upon posting at the Decree Board. Activities that were lawful before a new provision but are unlawful after it are not prosecutable for acts committed before the provision's posting. However, ongoing activities that began before a provision and continue after it are subject to the new provision as of the posting date. The Commission reserves the right to apply new interpretations of existing provisions retroactively in cases where the previous interpretation is determined to have been incorrect." },
      ]
    },
  ]
};


export const WORLD_LORE = {
  title: "The World of Acornia",
  overview: `Acornia is a world of ancient forest so vast that the sky is merely a rumour — something glimpsed between branches, spoken of by those who climb high enough. Civilisation lives in the canopy: on platforms lashed to trunks the width of city blocks, in hollows carved across centuries, on bridges of woven root that sway in winds that have no name yet. Below is the floor, where light barely reaches. Above is the open sky, where only the brave or the reckless go. In between is everything: markets and temples, warlords and healers, secrets buried in bark and truth carved into heartwood.

The folk of Acornia are squirrel-kind — five peoples shaped by the forest in five different ways. For thousands of years they lived in uneasy, often beautiful balance, connected by trade, by story, and by the World Tree at the heart of all things.

Then came the Cutting. And the balance was broken.`,

  chapters: [
    {
      id: "yggdorn",
      title: "Yggdorn, the World Tree",
      icon: "🌳",
      body: `Before the Canopy Cities had names, before the first rope bridge was strung between branches, there was Yggdorn. The World Tree stood at the convergence of all five great canopies — a trunk so massive that three settlements were built along its base without their inhabitants ever meeting. Its highest branches touched cloud. Its deepest roots drank from underground rivers older than memory.

Yggdorn was not merely enormous. It was alive in a way the other trees were not. Spirits dwelt within its bark — nature's oldest, wisest entities, bound willingly to the Tree's heartwood as keepers of balance. The spirits maintained the weather, guided migrating animals, kept the Hollow from spreading through the roots of the world. Shamans and oracles made pilgrimage to Yggdorn from every canopy, and the Tree answered them in wind and root-tremor and the slow creak of wood that could, if you knew how to listen, sound almost like language.

The Palewhisker folk — those rare white-furred oracles born once a generation — were said to be Yggdorn's chosen interpreters. They spoke for the Tree when it chose to speak. The last generation of Palewhiskers who remembered Yggdorn in its full glory are nearly all gone now. Only Seraphina Whiterun, the Last Oracle, remains.

Yggdorn was not a god. It insisted on this, in the days when it spoke. It was simply the forest made aware — ancient, patient, achingly mortal.`,
    },
    {
      id: "the-cutting",
      title: "The Cutting",
      icon: "⚔️",
      body: `The Rat Barons did not arrive as conquerors. They arrived as merchants.

The Baron families came from the underground warrens — vast tunnel systems beneath the oldest canopy cities, where rat-kind had lived for centuries in industrious obscurity. They were miners, they said. Metalworkers. Craftspeople. They had iron, and squirrel-kind needed iron tools. The arrangement seemed fair. It seemed mutual.

Generations passed. The trade routes deepened. The Barons bought warehouses, then inns, then city seats. They hired Greycoat administrators to run their accounts, then replaced them with their own. By the time the first garrison appeared in a Canopy City, there were already Rat soldiers in every major settlement from the Elder Grove to the Sky-Root Peaks — not as conquerors, but as "trade protection."

The Cutting happened on the Night of Iron Acorns. Every major settlement across all five canopies received a visit simultaneously — coordinated with a precision that suggested decades of planning. The visits were not armies. They were small, precise. An Enforcer captain at each city council. A warrant, sealed with the Baron's iron stamp. A list of names.

At Yggdorn itself, a team of Baron engineers spent forty-one days — historians later counted the saw marks — working through the World Tree's roots with iron instruments and a mineral called Hollowstone, a black crystal that disrupted the spiritual web holding the tree together. When the last root was severed, the Tree did not fall dramatically. It simply went quiet. The spirits stopped speaking. The weather patterns unravelled. Animals in the Elder Grove went still, then returned with bark-grey eyes and no memory of themselves.

The canopies were cut off from each other. Trade routes broke. The spiritual roads that Palewhiskers had walked between realms went dark. The Barons had what they wanted: five separate, frightened peoples who could no longer easily reach each other, each facing their own crisis, each too busy surviving to unite.

That was four years ago. The resistance is only beginning.`,
    },
    {
      id: "hollow",
      title: "The Hollow",
      icon: "🖤",
      body: `The Hollow is not a creature or a poison, though it acts like both. It is a spiritual wound — the rot that leaked out when Yggdorn's spirit-network collapsed. Where once the World Tree maintained the invisible threads of life-force flowing through the forest, now those threads fray and corrupt.

Hollowstone is the Baron's instrument of accelerated Hollow spreading. These black crystals — mined from deep beneath the warrens — seem to absorb spiritual energy and replace it with a slow necrotic resonance. Planted at the base of a tree, a crystal will Hollow-Touch every animal within the grove within days. The animals don't die. They change. Their fur turns bark-grey, their eyes go opaque, their behaviour becomes mindless and aggressive. They spread the sickness through bites and proximity.

The Hollow does not spread indefinitely on its own — without Hollowstone amplification, it moves slowly, repelled by healthy forest. But the Barons have placed crystals throughout the Elder Grove and near several Canopy City roots, and no one yet knows how many more are buried and waiting.

Shamans can slow the Hollow through ritual. They cannot reverse it without first removing the Hollowstone source. Palewhiskers can sense Hollow corruption at a distance — their white fur reportedly yellows when they enter heavily infected areas, an early warning the Barons have learned to exploit by sending Hollow scouts ahead of their patrols.

Three things are known to repel the Hollow: the ritual herbs carried by Grove Shamans, direct sunlight to the infection source (the crystals crack in prolonged exposure), and the spiritual resonance of a living Yggdorn fragment — of which only a handful remain.`,
    },
    {
      id: "rat-barons",
      title: "The Rat Barons",
      icon: "🐀",
      body: `The Rat Barons are not a single ruler. They are five Baron families, each controlling one of the great canopy regions — and each in constant, barely-concealed competition with the others for dominance. Their unity is enforced by the Iron Compact, a treaty signed in the underground warrens a century ago, which requires all five families to present a unified front to the outside world. Within that front, they scheme endlessly.

**House Gravel** controls the Canopy Cities through sheer economic dominance. Their Trade Commission runs every major guild. Their patriarch, Baron Aldous Gravel, is old and paranoid, surrounded by informants. He wrote the Iron Decree.

**House Scrawl** provides the military. General Scrawl — whose given name no one remembers — commands the Enforcer armies across all five canopies. He is effective, brutal, and widely believed to be planning to make himself the first sole Baron once the old families grow weak enough. He respects only strength.

**House Vox** runs intelligence. The Vox network of informants is how the Barons knew which resistance cells to crush first. Mistress Vox herself is believed to be Shadowtail-born — a rumour she neither confirms nor denies, because the uncertainty frightens people more than the truth.

**House Deep** manages Hollowstone extraction and distribution. Baron Deep rarely surfaces; her representatives wear iron masks. The Hollow's current spread is considered a House Deep engineering project.

**House Gilt** handles finance and bribery. Every collaborator in every canopy settlement is on House Gilt's payroll. The House also funds the Feather Tax enforcement in the Nightwood Hollows through a contract with the Owl Courts — one of the Baron's few alliances with non-rat powers.

Against them stands the resistance — fragmented, underfunded, and increasingly desperate. But growing.`,
    },
    {
      id: "resistance",
      title: "The Resistance",
      icon: "🌰",
      body: `There is no single resistance. That is both its weakness and its strength.

The **Free Canopy Council** is the closest thing to a central authority — a network of Greycoat administrators and Redpelt Grove Wardens who have been exchanging coded acorn-messages since the first year of occupation. They have no military power but excellent intelligence and a willingness to fund anyone who acts against the Barons. Their headquarters changes location every moon. Current leader: Aldric Graybough, a weathered Greycoat city councillor who survived three assassination attempts and has stopped counting.

The **Night Guild** operates in the Nightwood Hollows and the lower quarters of every Canopy City. Shadowtail-founded, they are assassins, thieves, and information brokers who work for the resistance at a significant discount — because the Barons also employ their competitors, which the Guild considers an insult that requires correction. Founder Sable Crowfur has been officially dead for two years. She attends meetings through intermediaries.

The **Grove Wardens** are what remains of the Redpelt warrior tradition — a handful of survivors in the Elder Grove and scattered through the deep forest. They are the only faction that has directly attacked Hollowstone crystals. They are also dying, because the Hollow is faster than they are. Warden Captain Briar Thornward leads them with the grim efficiency of someone who has stopped hoping for reinforcements and started planning final stands.

The **Sky Speakers** are Glideborn scouts who run messages between canopies faster than any ground route. The Barons have air patrols but the Glideborn know the thermals in ways no rat-built airship can match. Sky Speaker Captain Silverfin has single-handedly kept communication between the five canopies alive for three years.

And then there are the wanderers — individuals like the party — who exist in the cracks between factions, trusted by all of them because they belong to none.`,
    },
  ],
};

export const FOLK_LORE = {
  Greycoat: {
    emoji: "🐿️",
    title: "The Greycoats",
    subtitle: "The Common Heart of Acornia",
    homeland: "The Canopy Cities",
    population: "Abundant — the most numerous folk in the cities",
    appearance: `Greycoats are compact, quick-eyed squirrels with coats ranging from ash-silver to warm charcoal. Their tails are slightly less bushy than the forest folk — a long-ago adaptation to life in tight market quarters and low-ceilinged warrens. City-born Greycoats often have ink-stained paws and the particular squint of those who spend their lives reading ledgers and watching crowds.`,
    origin: `The Greycoats are the oldest urban folk — the ones who first looked at an enormous tree and thought not of the forest it represented, but of the city it could contain. Two thousand years ago, when the other folk still lived scattered through the canopy in tribal groups and nomadic bands, early Greycoat traders began lashing platforms between the highest branches, stringing rope bridges across the gaps, building the first permanent settlements above the forest floor.

They built the Canopy Cities because they needed places to trade. They needed places to trade because they understood, earlier than anyone, that the five folk were stronger connected than separate. The great market-cities they built became neutral ground — places where Redpelt warriors and Shadowtail spies and Glideborn scouts could meet without the old territorial tensions flaring into violence. For a thousand years, the Greycoat gift was this: they made the world smaller.`,
    preCutting: `Before the Cutting, the Greycoats ran everything that required coordination. The trade guilds, the postal service, the tax records, the city councils. They were administrators, merchants, scribes, negotiators. This made them indispensable and, in some eyes, deeply annoying. The other folk sometimes resented Greycoat economic power, their tendency to put a price on everything, their apparent belief that a problem unsolved was simply a transaction not yet completed.

But the cities worked. Food moved. Disputes were settled with contracts rather than claws. The Canopy Cities under Greycoat administration were, by almost any measure, the most functional civilisations in Acornia's history. The Greycoats weren't warriors — they fought like cornered merchants when forced to, which is to say viciously and without pride — but they didn't need to be. They had systems. Systems lasted longer than armies.

Culturally, Greycoats celebrated adaptability. Their festivals honoured the first traders who made contact with hostile tribes and walked away with alliances instead of arrows. Their children were taught languages before weapons, negotiation before combat. "A closed fist takes nothing" was the old proverb. "An open paw takes everything" was the follow-up that the other folk found slightly sinister.`,
    postCutting: `The Cutting hit the Greycoats hardest in the softest way. No dramatic battles, no destroyed groves. The Rat Barons simply walked into institutions the Greycoats had built over centuries and sat down in the chairs. Trade commission? Now a Baron subsidiary. City council? Advisory body, no real authority. The postal service? Dissolved; information now moves through Baron channels only.

Many Greycoats collaborated, not from cowardice but from a genuine and catastrophic miscalculation — they believed they could work within the Baron system and slowly reclaim power through the tools they knew. Some still believe this. Most now see it as what it was: the Barons using Greycoat institutional knowledge to consolidate control while the Greycoats themselves became the visible face of an oppressive system, absorbing the resentment that should have gone to the Barons.

The resistance that emerged is Greycoat at its core — underground networks running on favours, coded correspondence, and the institutional knowledge of people who spent careers inside the system they now fight to dismantle.`,
    majorFigures: [
      {
        name: "Aldric Graybough",
        title: "The Grey Flame — Resistance Council Leader",
        alignment: "Hero",
        desc: `A former city council administrator who watched colleagues disappear one by one after the Cutting and eventually stopped pretending the disappearances were coincidences. Graybough is sixty years old, walks with a limp from an Enforcer truncheon, and has the particular quality of exhausted fury that makes people follow him without understanding why. He is not inspiring in the traditional sense — he does not make speeches, he does not promise victory. He makes lists. His lists tell you exactly what is wrong, who is responsible, and what the next three steps are. Three assassination attempts in four years and he is still here, still making lists. The fourth attempt will find him in the middle of a fourth list.`,
      },
      {
        name: "Maren Dustfur",
        title: "Shadow of the Counting House — Master Spy",
        alignment: "Hero",
        desc: `A young Greycoat woman who worked as a House Gilt financial clerk for two years before the resistance understood what she was actually doing. Maren memorised every transaction she processed — names, amounts, dates, the particular format of House Gilt's coded ledger system — and delivered it to Graybough in a single conversation that lasted four hours and reduced three Resistance analysts to shaking. She has been out of the Baron counting houses since then, but her knowledge of their financial network remains the most valuable intelligence asset the Free Canopy Council possesses.`,
      },
      {
        name: "Chancellor Tallow",
        title: "The Hollow Councillor — Baron Collaborator",
        alignment: "Villain",
        desc: `The last functioning member of the old Canopy City council, Tallow has served as the Baron's visible administrator for four years. He has convinced himself that his moderation has saved lives — that without him, the Enforcers would be much worse. He is probably right and this does not make him less culpable. Tallow is intelligent, well-read, and deeply afraid, which is a dangerous combination. He knows enough of the Resistance network to destroy it. He has not yet used this knowledge. No one knows why.`,
      },
    ],
  },

  Redpelt: {
    emoji: "🦊",
    title: "The Redpelts",
    subtitle: "Fierce Children of the Old Groves",
    homeland: "The Elder Grove and deep forest territories",
    population: "Diminished — the Hollow Sickness has devastated their groves",
    appearance: `Redpelts are the most striking of the folk — burnished orange-red fur that deepens to rust-brown in winter, amber eyes that glow in low light, and a physical presence that makes other folk unconsciously step back. They are slightly larger than most squirrel-kind and carry themselves with the territorial awareness of people who have defended their home for ten thousand years.`,
    origin: `The Redpelts are the oldest folk — older than the Greycoat cities, older than Shadowtail spy networks, older perhaps than the Owl Courts. They were here when Yggdorn first stretched its roots through the deep earth. Their oral histories, chanted by Grove Wardens on the long nights of the dead-season, describe a time when squirrel-kind and the World Tree spoke to each other as equals, when Redpelt elders would sit in Yggdorn's great root-halls and the Tree would answer questions in the language of wind through leaves.

Whether this is literal truth or the beautiful exaggeration of oral tradition doesn't matter: the Redpelts were the World Tree's first neighbours, and they took the role seriously. The Grove Wardens — their warrior-priest tradition — were established specifically to protect the ancient trees from any threat, spiritual or physical. For millennia, the grove was healthy. For millennia, the Wardens had very little to do.`,
    preCutting: `Before the Cutting, the Redpelts lived in the deep forest in tight territorial groups called Groves, each centred on an ancient tree — not Yggdorn, but old enough to carry spiritual memory. Each Grove had its Wardens and its Keepers, a social structure so old that the other folk sometimes struggled to understand it: the Wardens were the protectors, the Keepers were the shamans, and the relationship between them was not one of hierarchy but of necessary tension, like the two sides of a root that split and must eventually rejoin.

Redpelts traded with the Canopy Cities but rarely lived in them — the compressed architecture and constant noise made them uneasy in a way they usually didn't bother explaining. They were considered fierce, territorial, and slightly wild by urban folk who had never stood inside an Elder Grove at dawn when the light comes through the canopy in specific shafts and the world smells of wet bark and something older than language.`,
    postCutting: `The Hollow Sickness came for the Elder Grove first because it was closest to Yggdorn's roots, and it came fast. Animals the Redpelt Wardens had known for years — grove deer, bark-badgers, the ancient tortoise who had lived under the Great Root for six hundred years — returned from the corruption zone with grey eyes and attacking anything they recognised. A Warden named Ash killed his own bonded crow in the first week. He doesn't talk about it.

The Grove Wardens became the first organised military resistance against the Barons — not because they chose to prioritise the political fight but because the Hollowstone crystals in the Elder Grove had Baron seals on them, and the Wardens connected the rot to its source quickly. Their first action was not an assassination or an uprising. A small Warden team walked into a Baron supply convoy, removed three Hollowstone crystals, and walked out with them into the deep forest. The crystals were destroyed. The three Wardens were later caught. The resistance decided they were worth remembering.`,
    majorFigures: [
      {
        name: "Briar Thornward",
        title: "The Red Shield — Grove Warden Captain",
        alignment: "Hero",
        desc: `Captain of the remaining Grove Wardens — a title that once commanded two hundred warriors and now commands eleven. Briar Thornward is forty years old and looks sixty, which is what four years of the Hollow does to a person. She fights with the particular grimness of someone who has watched everything she was trained to protect turn to bark and silence, and has decided that the appropriate response is to keep fighting anyway. She is not a politician. She is not strategic in the Graybough sense. She understands terrain, timing, and the specific vulnerability of Hollowstone crystals to concentrated sunlight, which she exploits every chance she gets. The resistance considers her a hero. She considers herself the last professional in a world that ran out of professionals.`,
      },
      {
        name: "Vex the Marked",
        title: "The Black-Furred — Hollow Scholar",
        alignment: "Hero",
        desc: `A Redpelt whose fur went permanently black after extended exposure to Hollow corruption — something the shamans say shouldn't be possible but clearly is. Vex was the first to extract and safely transport a Hollowstone sample to the Free Canopy Council's shaman network, allowing the first proper study of the mineral. She is not a warrior. She is a herbalist and accidental chemist who believes the Hollow can be reversed, given the right catalyst. She works out of a fortified hollow in what remains of the Elder Grove, surrounded by failed experiments and notes written in seventeen languages. She has not left the Grove in two years.`,
      },
      {
        name: "Elder Ashroot",
        title: "The Last Keeper — Grove Elder",
        alignment: "Elder",
        desc: `The oldest living Redpelt, Ashroot served as a Keeper — the shaman half of the Warden-Keeper partnership — for sixty years before the Cutting. She is now past one hundred and remembers Yggdorn's living voice. She will not leave the Elder Grove under any circumstance, even as the Hollow advances. She says she is where she needs to be. She spends her days in trance-communion, and sometimes emerges from it having mapped the Hollow's current spread with unsettling accuracy. The Wardens use her maps. No one asks how she gets them.`,
      },
    ],
  },

  Shadowtail: {
    emoji: "🖤",
    title: "The Shadowtails",
    subtitle: "Born from Moonlit Canopies",
    homeland: "The Nightwood Hollows and the lower markets of Canopy Cities",
    population: "Widely distributed — found in small numbers almost everywhere",
    appearance: `Shadowtails are long and lean, with dark fur that runs from deep charcoal to pure black, and eyes adapted for low-light work — larger than the other folk's, often reflecting gold or green in torchlight. Their tails are exceptionally long and prehensile, used for balance in the cramped passages of night markets and for signalling in the silent language of the Night Guild. A Shadowtail standing perfectly still in shadow is, functionally, invisible.`,
    origin: `The Shadowtails emerged from the deep forest understory — the layer between forest floor and canopy where the light is always uncertain and the rules are always different. They developed in the gaps between other folk's territories, which meant they developed one very specific skill above all others: reading situations that other people would prefer they didn't notice.

Shadowtail communities formed not around territory or tradition but around information. The oldest Shadowtail social structure is the Intelligence Circle — a group of families who pool and share knowledge as currency. This predates the Night Guild by centuries. The Guild simply professionalised a practice that was already embedded in how Shadowtail society worked.`,
    preCutting: `Before the Cutting, the Shadowtails occupied a unique position in Acornian society — trusted by everyone for specific things and trusted by no one in general, which was an arrangement most of them found entirely satisfactory. They served as go-betweens in negotiations where the parties didn't want to be seen talking to each other. They carried messages across canopies when official channels were compromised. They provided, in the tactful Shadowtail phrase, "discretionary services" — which covered a range of activities depending on the client and the payment.

The Owl Courts were their primary employer before the Cutting. Owl nobles found direct interaction with squirrel-kind beneath their dignity but needed squirrel networks to maintain their influence. Shadowtails provided that access, earning pay and a degree of protection in the Nightwood Hollows that other folk didn't have. It was a transactional relationship on both sides — the Owls needed the Shadowtails' networks, and the Shadowtails needed the Owls' territory. Neither particularly trusted the other. Neither particularly cared.`,
    postCutting: `The Cutting changed the Shadowtails' relationship with the Owl Courts permanently. When the Courts issued the Feather Tax — demanding one living squirrel per settlement per moon as tribute — the Shadowtails faced a choice no transactional arrangement prepared them for: enforce the Tax on their own people to maintain the contract, or break the contract and lose their protection.

Sable Crowfur, then the Night Guild's most senior active operative, convened an emergency Intelligence Circle that lasted three days. What came out of it was the Night Guild in its current form — not merely an information-and-services organisation but an active resistance network, operating in the Nightwood Hollows and every major Canopy City simultaneously. The Owl Courts lost their best intelligence network overnight. They responded by placing a price on Crowfur's head.

Crowfur officially died six months later. The Owl Courts collected the reward from an informant who was, upon later investigation, a Night Guild operative. The price was paid with money taken from an Owl Court treasury. The Guild considered this elegant.`,
    majorFigures: [
      {
        name: "Sable Crowfur",
        title: "The Twice-Dead — Night Guild Founder",
        alignment: "Hero",
        desc: `Officially dead twice, possibly three times, depending on which Night Guild record you consult. Crowfur founded the current resistance form of the Night Guild after the Feather Tax, and has been officially absent from all subsequent operations — which is the Guild way of saying she is present in all of them. Her last confirmed physical sighting was four years ago. Since then, she has communicated exclusively through coded messages carried by intermediaries who themselves don't know who they're working for. Three separate Owl Court nobles have paid significant sums for her death. The Guild has been helpful in facilitating these payments.`,
      },
      {
        name: "Moth Inkstain",
        title: "The Candlemaker — Information Broker",
        alignment: "Neutral",
        desc: `Officially the proprietor of Moth's Candlemaker in the Nightwood Hollows, a perfectly unremarkable candle shop that has somehow survived four years of Owl Court occupation. Moth sells information at the same price as candles — which is to say, whatever the market bears. Moth works for the resistance, for the Night Guild, and occasionally for clients whose identities are never discussed, and has survived this balancing act through an extraordinary memory, the genuine belief that everyone deserves to know exactly what they're paying for, and a set of bolt-holes in the Hollows that no map has ever captured.`,
      },
      {
        name: "Vane Silkwhisper",
        title: "The Baron's Eye — Shadowtail Traitor",
        alignment: "Villain",
        desc: `A former Night Guild operative who has been working for House Vox for three years. Vane believes — with real conviction, which makes them more dangerous than a cynic would be — that the Barons represent stability and that stability is the highest possible good. Every settlement the resistance destabilises, every Enforcer killed, every act of sabotage confirms this belief for them. Vane has delivered three Night Guild safe houses to Enforcer squads. The Guild has sent two assassins. Vane is still alive, which suggests either extraordinary luck or intelligence capabilities that rival the Guild's own.`,
      },
    ],
  },

  Glideborn: {
    emoji: "🪂",
    title: "The Glideborn",
    subtitle: "Those Who Touch the Sky",
    homeland: "The Sky-Root Peaks",
    population: "Small but concentrated — the Peaks are difficult to reach and defend easily",
    appearance: `Glideborn are the most physically distinctive folk — slightly lighter-boned than other squirrel-kind, with wider forearms suited to the glide-cloak they wear from adolescence onward. Their fur is streaked with pale silver-blue highlights that catch the light at altitude. Their eyes are exceptional at distance but struggle in very low light — a trade-off that shapes their culture profoundly. Glideborn children learn to read thermals before they learn to read text.`,
    origin: `The Glideborn evolved in the highest canopy — where the branches thin and spread wide and the wind runs constant and the sky is not a rumour but a fact. They developed gliding adaptations over thousands of years, assisted (the shamans say) by the sky spirits that once moved freely through the upper thermals. Whether the spirits shaped the Glideborn or the Glideborn attracted the spirits depends on who you ask, and both answers are probably partially true.

Their communities formed around thermals — the invisible columns of warm air that rise from the heated bark and allow sustained gliding between peaks. A Glideborn settlement is positioned not for ground-level defensibility but for aerial access: approached from the sky, easily defensible; approached from the bark, a nightmare of vertical climbing and narrow ledges that ground-bound attackers struggle with.`,
    preCutting: `Before the Cutting, the Glideborn were the fastest communication network in Acornia — faster than any ground route, faster than trained carrier-animals, certainly faster than anything the Rat Barons had below ground. The Sky Treaty, negotiated between the Canopy Cities and the Glideborn clans three centuries ago, guaranteed their right to travel freely between all canopies in exchange for priority message-carrying services. The treaty was honoured by both sides, which distinguished it from most treaties in Acornian history.

Glideborn culture is built around two values that seem opposite and aren't: freedom and precision. The sky is enormous and unforgiving, and the difference between a thermal perfectly read and a thermal misjudged is the difference between arrival and a long fall. Glideborn are among the most technically precise folk in Acornia and among the most personally independent. They don't follow orders well. They follow observation excellently.`,
    postCutting: `The Sky-Root Peaks became a refuge after the Cutting — a place other folk came to when the ground became too dangerous. The Glideborn received them with characteristic pragmatism: more people meant more intelligence from the lower canopies, and more intelligence meant better decisions. The Peaks' natural defences made them hard to assault. The Barons tried twice with airship-borne troops; both attempts ended badly for the airships.

But the rogue storm spirit changed the calculation. When Yggdorn's fall unbound the spirit network, the storm spirits of the upper peaks lost the anchoring that had kept them in balance. The Binding Stones — ancient ritual anchor-points carved into the highest peaks — began to crack. The largest storm spirit, which the Glideborn call the Storm That Was Always Here, expanded into something that now tears apart settlements with random violence. It doesn't intend to destroy. It simply has no reason not to.

Skymother Aerith, the current Glideborn elder, has been attempting spirit-binding rituals for two years. Each attempt has partially worked, and each partial success has made the spirit angrier at the next attempt. She believes she needs help she cannot provide alone.`,
    majorFigures: [
      {
        name: "Skymother Aerith",
        title: "The Wind-Reader — Glideborn Elder",
        alignment: "Hero",
        desc: `The oldest active Glideborn and the closest thing the clans have to a single leader — a position they officially don't have, which means Aerith's authority is entirely based on the respect others give her, which she has never once abused. She bound the first rogue spirit thirty years ago, before Yggdorn fell, as a young shaman dealing with a minor storm-entity that had wandered from its anchor point. The current situation is approximately forty times more complex, and she describes it with the calm of someone who has been doing complex things for a long time and does not find calm to be in contradiction with urgency.`,
      },
      {
        name: "Captain Silverfin",
        title: "The Sky Speaker — Resistance Courier Network Leader",
        alignment: "Hero",
        desc: `The fastest glider in the known canopies, which is a bold claim and one that is regularly tested and regularly confirmed. Silverfin runs the Sky Speaker network — the cross-canopy courier service that has kept the resistance's five fragmented factions in contact for three years. The Baron airships have tried seventeen times to intercept Silverfin's routes. They have succeeded twice, and both times Silverfin was not on those routes, having adjusted course based on Baron patrol patterns that the Sky Speakers track with the same obsessive precision they apply to thermals.`,
      },
      {
        name: "Drift the Unmoored",
        title: "The Lost Glider — Rogue",
        alignment: "Neutral/Villain",
        desc: `A Glideborn who lost their clan settlement to the storm spirit two years ago and has since been operating as a mercenary courier — taking messages for anyone who pays, including, on at least two confirmed occasions, the Rat Barons. Drift is not politically motivated. Drift is surviving. The Night Guild has them under observation. The Sky Speakers have made two recruiting attempts. Drift has ignored both. The situation is unresolved.`,
      },
    ],
  },

  Palewhisker: {
    emoji: "🤍",
    title: "The Palewhiskers",
    subtitle: "The Touched Ones, Marked by Fate",
    homeland: "Nomadic — traditionally they travelled all canopies freely",
    population: "Critically rare — fewer than thirty known living Palewhiskers in all canopies",
    appearance: `Palewhiskers are born with white fur — not grey, not silver, but the particular warm white of old paper or the moon reflected in still water. This is not albinism; their eyes are fully pigmented, typically amber or pale gold. The white fur tends to yellow in the presence of Hollow corruption, which is useful and alarming in equal measure. Palewhiskers are otherwise physically unremarkable — what makes them visually striking is the quality of their attention. A Palewhisker looking at you gives the persistent impression that they are also seeing something behind you.`,
    origin: `The Palewhiskers' origins are deeply contested and probably unknowable. The oldest Greycoat records describe them appearing in the earliest Canopy Cities as wandering oracle-traders — arriving, being consulted, departing. The Redpelt oral tradition describes Palewhiskers as gifts of Yggdorn itself: the World Tree occasionally manifested its awareness through a newly-born Palewhisker, who would grow up to interpret its will. The Palewhiskers themselves have three different and mutually contradictory creation stories, which they find amusing rather than troubling.

What is consistent across all accounts: they are rare — perhaps one or two born per generation across all five canopies — and they are connected to something the other folk are not. Whether that something is Yggdorn, the spirit network, fate itself, or simply an unusual neurological sensitivity that produces accurate pattern-recognition, the result is the same: Palewhiskers know things they shouldn't.`,
    preCutting: `Before the Cutting, Palewhiskers were revered, consulted, occasionally feared, and always watched. They served as oracles, spiritual advisors, neutral parties in disputes, and the living voice of Yggdorn when the Tree chose to communicate through them. Yggdorn's messages came infrequently — the Tree was ancient and not given to pronouncements — but when they came, they were passed through whatever Palewhisker was in proximity, who would emerge from a trance with specific information that was usually interpreted, debated, and argued about for decades.

Palewhiskers lived as wanderers by tradition and necessity — consulting in one canopy for a season before moving on. This kept their presence fresh and their neutrality credible. It also meant they were difficult to pressure: a Palewhisker who didn't like a situation could simply leave. Most did. Occasionally one stayed long enough to form real attachments, which always ended in the particular sorrow of watching the people you care about age and die while you move on.`,
    postCutting: `When Yggdorn was cut, every living Palewhisker felt it simultaneously. Those who could describe it later described it as silence replacing a sound they hadn't consciously heard — like realising, only after it stops, that there had been music the whole time.

The effects varied. Some Palewhiskers lost their abilities entirely, suddenly ordinary squirrel-kind who had to relearn how to move through the world without the constant background awareness they'd never noticed they relied on. Others found their abilities fractured and unpredictable — visions arriving at random without the control they'd previously had, portents that they couldn't interpret because the framework that made them legible was gone. A handful went mad. One in the Sky-Root Peaks threw himself from the highest peak two days after the Cutting; the Glideborn cremated him with their full ceremony.

The Rat Barons added a specific horror: House Vox identified Palewhiskers early as potential intelligence assets or threats, and began systematic collection. They called it "protection." The Palewhiskers who submitted live in House Vox facilities now, consulted when needed. The others are hunted.`,
    majorFigures: [
      {
        name: "Seraphina Whiterun",
        title: "The Last Oracle — Elder Palewhisker",
        alignment: "Hero/Elder",
        desc: `The oldest living Palewhisker — one hundred and twelve years old, white fur now thin and faintly yellowed at the edges from decades in and out of Hollow-adjacent territory. Seraphina was young when Yggdorn still spoke and old enough to remember what its voice felt like. She has spent four years since the Cutting attempting to determine whether Yggdorn is truly dead or merely silent — a distinction she believes matters enormously and that most people she discusses it with find either impossibly abstract or desperately hopeful in a way they can't afford. She is not comforting. She is precise.`,
      },
      {
        name: "Scholar Ash",
        title: "The Cartographer of the Unseen — Researcher",
        alignment: "Hero",
        desc: `A young Palewhisker (twenty-three years old — extremely young for a folk that can live two centuries) who lost their predictive abilities entirely after the Cutting and responded by becoming a scholar. Ash spent two years in Greycoat archives and Redpelt oral-history sessions, cross-referencing every recorded Palewhisker vision and Yggdorn message in history. The result is a map — not of physical territory but of pattern — that Ash believes indicates Yggdorn's root-network is still active below ground, that the Tree is not dead but dormant, and that the Hollowstone crystals are not destroying it but suppressing it. If Ash is right, removing the crystals wouldn't just stop the Hollow. It would wake the World Tree.`,
      },
      {
        name: "Pale Nimbus",
        title: "The Baron's Oracle — Captive",
        alignment: "Captive",
        desc: `Held in a House Vox facility in the Canopy Cities for three years. Nimbus was twenty-one when captured, newly come into their abilities, and has been systematically queried by House Vox on intelligence matters ever since. They have provided accurate information — they cannot easily suppress visions, and the Vox questioners are thorough. They have also, according to Night Guild intelligence, been providing inaccurate context for that information in ways that make it misleading without being verifiably false. Either this is deliberate resistance or Nimbus's fractured abilities make them genuinely unreliable. House Vox has not yet determined which.`,
      },
    ],
  },
};

export const MONSTER_LORE = [
  {
    id: "rat-baron-enforcer",
    name: "Rat Baron Enforcer",
    icon: "🐀",
    threat: "Political / Military",
    found: "Canopy Cities, checkpoints, patrol routes, everywhere the Iron Decree extends",
    overview: `Enforcers are the Baron military's visible instrument of control — the iron-armoured soldiers who collect taxes, enforce the Iron Decree, and respond to any resistance activity with organised violence. They are not monsters in the traditional sense. They are people, which in many ways makes them worse.`,
    origin: `The Enforcer corps was established by General Scrawl three years before the Cutting, at a time when the Rat Barons were still presenting themselves as trading partners. The official title was "Trade Security Forces" — their job, ostensibly, was to protect Baron convoys from banditry. In practice, Scrawl was building a standing army in plain sight, training it in urban occupation tactics while the Canopy Cities' councils debated whether the growing Baron military presence was cause for concern.

Enforcers are conscripts from the deep warrens, given iron armor, a crossbow, a truncheon, and about three months of training before deployment. They are not individually exceptional fighters — their power comes from coordination, backup systems, and the weight of an institution that can replace any one of them immediately. They also have the particular advantage of operating on behalf of a system that controls food distribution, trade routes, and legal authority. Enforcer compliance rates are high not because people fear the individual Enforcer but because they fear what the Enforcer represents.`,
    notableIndividuals: [
      {
        name: "General Scrawl",
        desc: `The commander of all Enforcer forces, whose given name has been lost to deliberate omission from all Baron records — a power move the General implemented themselves. Scrawl is brilliant, methodical, and the closest thing to a direct threat the resistance faces as a unified entity. They are also, according to Night Guild intelligence, quietly preparing to make their own play for Baron supremacy once the five families have served their purpose.`,
      },
      {
        name: "Captain Vorn",
        desc: `Commander of the Canopy City garrison, nicknamed "the Pacifier" for the calm with which he processes escalating situations — none of which, in his view, require anything other than correct application of the Iron Decree. Vorn is not sadistic. He is procedural, which in occupation conditions produces the same results.`,
      },
    ],
    tactics: `Enforcers are trained to target healers and support figures first, to create environments of constant low-level anxiety rather than dramatic confrontations, and to use the Rally Rats ability to ensure they are never actually outnumbered when a fight starts. Fighting one Enforcer in an isolated location is manageable. Fighting Enforcers in Canopy City territory, where reinforcements can be signalled within minutes, is a fundamentally different problem.`,
  },
  {
    id: "hollow-touched-beast",
    name: "Hollow-Touched Beast",
    icon: "🖤",
    threat: "Environmental / Spreading",
    found: "The Elder Grove and any area near Hollowstone crystals",
    overview: `Hollow-Touched Beasts are not creatures in the traditional sense — they are victims. Any animal that spends sufficient time near Hollowstone corruption undergoes the Touching: their fur greys, their eyes cloud, their memory disappears, and their behaviour becomes a simple loop of aggression and spread. A Hollow-Touched animal cannot be reasoned with, bargained with, or frightened. It cannot be cured without removing the Hollowstone source first.`,
    origin: `The Hollow itself is the spiritual wound left when Yggdorn's root-network was severed. The forest's life-force, which once flowed through every tree and every creature in the Elder Grove in a slow invisible circulation, was disrupted catastrophically. The disruption created a void, and voids in the spirit-network fill with the closest available spiritual energy, which is corrupted resonance from the Hollowstone crystals the Barons planted.

The first Hollow-Touched animals were identified six months after the Cutting in the deep Elder Grove — a grove deer with bark-grey patches spreading from its flank where it had apparently been resting against a Hollowstone crystal. By the time the Redpelt Wardens reached it, the deer was mindless. The corruption spread to two other animals through contact within hours. The Wardens destroyed all three. They did not have two months left in them before the scale of the problem made individual responses inadequate.`,
    notableIndividuals: [
      {
        name: "The Great Hollowed",
        desc: `Reportedly a ancient Elder Tortoise — six hundred years old, one of the oldest animals in the Elder Grove — that was among the first touched by the Hollow. The Tortoise has been in the corruption zone for four years and has not followed the usual pattern: instead of mindless aggression, it has simply become enormous, slow, and surrounded by a radius of accelerated Hollow corruption. It doesn't attack unless approached within two zones. Something of the old tortoise's extreme patience seems to have survived the Touching, transmitted into the spreading patience of rot.`,
      },
    ],
    tactics: `The Hollow's real danger is not in individual combat but in area denial and spreading. A party that fights Hollow-Touched Beasts while standing near Hollowstone sources risks being exposed to the corruption cloud on beast death. The correct tactical approach is to identify and eliminate the Hollowstone crystal first, which weakens Hollow-Touched Beasts in the area (they become confused and less coordinated without the amplification source) before engaging them.`,
  },
  {
    id: "owl-court-noble",
    name: "Owl Court Noble",
    icon: "🦉",
    threat: "Political / Aerial",
    found: "The Nightwood Hollows, the upper canopy, anywhere the Feather Tax is enforced",
    overview: `The Owl Courts predate the Canopy Cities by centuries. They were the apex predators of the middle and upper canopy when squirrel-kind were still scattered and tribal, and they have never quite made peace with the fact that this is no longer true. The Feather Tax is not primarily an economic measure. It is a status reassertion — the Owl Courts reminding squirrel-kind what the old relationship was.`,
    origin: `The Owls built their first courts in the hollows and high branches of the Nightwood long before squirrel-kind arrived. They were a natural aristocracy of the upper canopy — ancient, powerful, possessed of the particular arrogance that comes from being at the top of a food chain for so long that the food chain feels like a natural law rather than an ecological accident.

Yggdorn's rise changed their position. The World Tree's spiritual influence made overt predation of squirrel-kind socially and spiritually costly in ways the Owl Courts couldn't easily ignore. The Ancient Pact — an agreement between the Owl Courts and Yggdorn's representatives — formalised what had become practical reality: the Courts would not hunt squirrel-kind, and in exchange would receive recognition as the legitimate authority of the upper canopy and access to the Shadowtail spy networks. The Pact held for a thousand years.

When Yggdorn fell and the Pact had no spiritual enforcement mechanism, the Owl Courts waited exactly six months before issuing the Feather Tax.`,
    notableIndividuals: [
      {
        name: "Duke Moonfeather",
        desc: `The architect of the Feather Tax and the public face of Owl Court authority in the Nightwood Hollows. Ancient, beautiful, and possessed of the absolute conviction that the current arrangement is simply a return to correct order. Moonfeather negotiated the contract with House Gilt that funds Enforcer backup for Tax collection — a pragmatic alliance that other Owl Court nobles find somewhat undignified but have not moved to end.`,
      },
      {
        name: "Elder Hush",
        desc: `The oldest member of the Owl Courts, Hush was present for the signing of the Ancient Pact a thousand years ago and considers the Feather Tax a catastrophic political error that will ultimately cost the Courts more than it gains. Hush does not openly oppose Moonfeather. Hush does, however, occasionally provide information about Tax collection schedules to sources whose identities Hush considers it unnecessary to examine closely.`,
      },
    ],
    tactics: `Owl Court Nobles are aerial combatants who are at their most dangerous at the moment a fight starts — their Dive Strike, delivered before squirrel-kind have positioned themselves, is designed to eliminate a target in the opening exchange. After that, they are still dangerous but more manageable. Forcing a Noble to fight at ground level significantly reduces their effectiveness, and the Noble Gaze ability requires unbroken eye contact — looking away, even at cost, breaks its effect.`,
  },
  {
    id: "rogue-spirit",
    name: "Rogue Spirit",
    icon: "🌀",
    threat: "Environmental / Magical",
    found: "The Sky-Root Peaks, disrupted sacred sites, anywhere the spirit-binding network has collapsed",
    overview: `Rogue Spirits are not evil. This is important to understand before trying to fight one. They are unmoored — nature spirits that once served Yggdorn's balancing function, now freed from that purpose and without the framework that gave their power meaning. Their destructive behaviour is not malice. It is grief and disorientation expressed at a scale that destroys settlements.`,
    origin: `When Yggdorn maintained the spirit-binding network, nature spirits of all kinds — storm spirits, root spirits, water spirits, the ancient entities that maintained weather patterns and guided animal migrations — were anchored to specific locations and specific functions through Binding Stones and ritual agreements. The spirits were not prisoners; they could have broken these bonds at any time. They maintained them because the bonds gave them purpose and the purpose gave them the particular kind of peace that comes from knowing what you are for.

When Yggdorn's root-network was severed, the spiritual anchor points collapsed. Some spirits simply faded — their essential energy dispersing back into the forest in the way old things sometimes quietly become part of the ground. Others, the stronger ones, the older ones, found themselves suddenly without any framework at all — still powerful, still aware, but with no function, no anchor, and no Yggdorn to speak with about what to do next.

The Storm Spirits of the Sky-Root Peaks were among the strongest. They are also among the most distressed. They remember Yggdorn. They miss it in the specific way that ancient things miss the things that gave them shape.`,
    notableIndividuals: [
      {
        name: "The Storm That Remembers",
        desc: `The largest rogue spirit in the Sky-Root Peaks, and the one responsible for the worst settlement destruction over the past two years. It is not mindless — the Glideborn have observed that it avoids destroying specific landmarks, ones with particular spiritual significance. Skymother Aerith believes it is trying to communicate something. What it is trying to communicate, and whether there is time to understand before it destroys another settlement, is the current problem.`,
      },
    ],
    tactics: `Rogue Spirits must be approached with ritual awareness, not combat tactics. Fighting a Rogue Spirit directly is possible but profoundly inefficient — they can Phase, they disrupt Shaman healing, and they call weather against outdoor combatants. Ritual herbs weaken them. Binding Stone fragments trap them temporarily. A Shaman with sufficient Insight can attempt a Spirit Commune mid-combat, which carries risks but offers the only path to permanent resolution without destroying the spirit entirely.`,
  },
];

export const LOCATION_LORE = [
  {
    id: "canopy-cities",
    name: "The Canopy Cities",
    icon: "🏙️",
    enemy: "Rat Baron Enforcers",
    quest: "The Iron Decree",
    region: "Upper canopy — five great oaks, connected by rope bridges and lift-platforms",
    environment: `Stand on any major bridge in the Canopy Cities at dawn and you'll understand why people fought for four hundred years to build them. The mist rises from the forest floor far below, and the bridges catch it in their ropes like spider-silk, and the market stalls are lighting their first lanterns, and for a moment the whole city glows amber against the grey morning. The oaks themselves are the streets — not metaphorically, but literally. Platforms are carved directly into the bark, supported by root-branch-root systems that took centuries to develop. The largest districts are essentially their own ecosystems: rain water collected in bark-cisterns, light managed by carefully maintained canopy gaps, temperature controlled by the simple physics of bark that has absorbed summer heat for a thousand years.

The lower districts are different. Below the market levels, the bark-buildings compress together, the bridges narrow to single-file walkways, and the lanterns are fewer and dimmer. This is where the displaced folk live — those who lost their jobs when the Barons took the guilds, those who can't pay the gate tax to leave, those who simply have nowhere else to go. The lower districts smell of damp bark, cheap food, and the particular quiet of people who have learned not to attract attention.`,
    history: `The first platform was raised by a Greycoat trader named Aldur Greymoss approximately two thousand years ago — a simple trading platform where forest-floor folk and canopy folk could meet without the long climb. Other traders followed. The platform grew. Bridges appeared. The Canopy Cities weren't planned; they accreted, like bark does, layer by layer, each generation adding to what the previous one left.

The cities' golden age came during the three centuries before the Cutting — a period of extraordinary cultural exchange when Greycoat merchants, Redpelt warriors passing through, Shadowtail information brokers, and the occasional Glideborn courier all shared the same city streets. The Free Market period produced the greatest Acornian art, literature, and cuisine. It also produced the conditions the Rat Barons exploited — an open, trusting city that had forgotten what it looked like when a trading partner came with other intentions.`,
    nativePopulations: [
      { name: "Greycoat citizens", desc: "The majority population; run what remains of the guild system under Baron administration." },
      { name: "Shadowtail quarter", desc: "The lower night markets, technically operating in violation of the Iron Decree but doing so too profitably for Baron administrators to shut down entirely." },
      { name: "Baron garrison", desc: "Approximately 200 Enforcers plus rotating support staff; barracks on the second-highest oak." },
      { name: "House Gilt administrators", desc: "A dozen financial operatives managing tax collection; rarely leave the counting house district." },
    ],
    pointsOfInterest: [
      { name: "The Iron Decree Board", desc: "A massive public board where all current Iron Decree regulations are posted. New regulations appear without announcement. Citizens are expected to know them regardless." },
      { name: "The Ash Gate", desc: "The ruins of the old Yggdorn Memorial Gate — a ceremonial arch that once marked the beginning of the spiritual road to the World Tree. The Barons tried to demolish it; structural complications with the branch it's built on meant they settled for surrounding it with Enforcer fencing. People leave offerings at the fence." },
      { name: "The Free Canopy Council Safehouse", desc: "Changes location every moon. Currently above a grain merchant's warehouse in the lower market. The grain merchant does not know this." },
      { name: "The counting house district", desc: "House Gilt's operation: five interconnected buildings of exceptional security, where the financial records of every guild and citizen are maintained." },
    ],
    businessesAndInns: [
      { name: "The Crooked Acorn Inn", type: "Inn & Tavern", desc: "The oldest operating inn in the Canopy Cities — founded before the Cutting, run by the same Greycoat family for five generations. The current proprietor, Old Mosswall, was friends with the previous Free Canopy Council leader before that leader's arrest. She doesn't mention this. She makes excellent acorn bread and remembers everyone who has ever stayed." },
      { name: "Maren's Dry Goods", type: "Shop — Resistance Front", desc: "Officially sells preserved food, rope, and basic tools. Also transmits coded messages through a system of inventory stamps that the Barons have tried twice to decipher and failed both times. Maren Dustfur visits approximately monthly." },
      { name: "The Forge Quarter", type: "Industrial district", desc: "Now entirely Baron-operated, producing iron tools, weapons, and Enforcer equipment. Still staffed by the same Greycoat smiths who worked there before; the Barons kept them because the quality was good. The smiths keep a running silent account of everything they've made for the garrison." },
      { name: "Tallow's Council Hall", type: "Government", desc: "Where the Chancellor holds his official functions. Formally decorated with the old council symbols; informally now an administrative annex for Baron operations." },
    ],
    currentSituation: `The Iron Decree has been updated three times in the last six months. Each update increases tax rates, restricts movement, and shrinks the list of activities that don't require Baron permits. The population's compliance has been near-total, driven by genuine fear and the presence of visible enforcement. Underground, the Free Canopy Council has identified a moment: a shipment of Hollowstone crystals is moving through the city in four days, bound for a new deployment site. If it can be stopped, disrupted, or redirected to the Council's shaman network, it could provide intelligence on future Hollow deployments. The window is small. The risks are significant.`,
  },

  {
    id: "elder-grove",
    name: "The Elder Grove",
    icon: "🌿",
    enemy: "Hollow-Touched Beasts",
    quest: "The Bleeding Root",
    region: "Deep forest floor — the oldest section of the ancient wood, directly below Yggdorn's former root network",
    environment: `The Elder Grove is not dark the way night is dark. It is dark the way ancient things are dark — with accumulated time rather than mere absence of light. The trees here are so old that their bark has fossilised in places, turned to a stone-smooth grey that rings like iron when tapped. The canopy above is so dense that rain takes hours to reach the forest floor, arriving as a fine mist long after the storm that created it has moved on.

Normally the Grove smells of wet earth and fungal growth and the particular sharpness of very old wood. Now it smells of something else underneath: a sweetness that is almost attractive until you realise it's the scent of rot. The black sap appears first as streaks on the highest roots, then in pools along the bark depressions, then — deeper in — as rivers of it, flowing from the core of the corruption outward in slow, terrible arcs. In the contaminated zones, the bioluminescent moss that lines the root-halls has turned the wrong colour: instead of the natural blue-green, it glows a dim, sickly amber that Redpelt shamans call the Hollow Light.

Movement in the corrupted zones sounds wrong. Animals are audible — too audible, because the Hollow-Touched beasts have lost the self-preservation instinct that made forest creatures quiet. You can hear them before you see them. This is your warning.`,
    history: `The Elder Grove has been sacred Redpelt territory for ten thousand years — not in the sense of a claim that required defence, but in the deeper sense of a place that is simply part of what the Redpelts are. The Grove Wardens' traditional role began here, in these exact root-halls: watching over the oldest trees, maintaining the spiritual practices that kept the forest floor healthy, ensuring that Yggdorn's root-network remained unobstructed.

The Cutting changed the Grove immediately. Without Yggdorn's spiritual circulation, the deep roots began to leak — not water but the ambient life-force that had been slowly flowing through the root-network for millennia. The Hollowstone crystals the Barons planted accelerated this catastrophically. What would have been a slow decline became an active spreading corruption.`,
    nativePopulations: [
      { name: "Grove Wardens (remnant)", desc: "Eleven survivors of the once two-hundred-strong Warden force. Based in a hardened hollow half a day's walk from the corruption front." },
      { name: "Hollow-Touched beasts", desc: "Former forest deer, bark-badgers, root-foxes, and others. Mindless, aggressive, and spreading." },
      { name: "The Great Hollowed (rare encounter)", desc: "The ancient tortoise at the corruption's centre. Not aggressive unless approached within two zones." },
    ],
    pointsOfInterest: [
      { name: "The Black Heart", desc: "The Baron crystal at the centre of the corruption — a Hollowstone monolith the size of a small building, planted at the convergence of Yggdorn's largest surface roots. Removing or destroying it would slow the Hollow significantly and allow healing rituals to begin. Getting to it means crossing a kilometre of heavy contamination." },
      { name: "The Elder Root Shrine", desc: "An ancient Redpelt sacred site that the Hollow has not yet reached. A fully intact Yggdorn Root Fragment is embedded in its centre stone. If the shrine is held and purified, it could serve as a forward base for cleansing operations." },
      { name: "The Ring of Wardens", desc: "The site of the last mass Warden stand four months ago — a clearing ringed by the stone markers they set before the fight. The markers mean do not forget. The plants around them haven't died despite the proximity to Hollow corruption. The shamans find this significant." },
    ],
    businessesAndInns: [
      { name: "The Warden's Camp", type: "Outpost", desc: "A fortified hollow bark-structure serving as trading post, medical station, and the Wardens' headquarters. Trade here is barter. What the Wardens need most: anti-Hollow herbal compounds, iron weapons, and information about the Baron crystal placement schedule." },
      { name: "Vex's Workshop", type: "Herbalist / Alchemist Lab", desc: "Vex the Marked's converted root-hollow, identifiable by the controlled Hollow contamination samples she maintains in sealed bark-containers around the perimeter. She trades anti-Hollow compounds and information for raw herbs she can't find in the contaminated zones, and for any Hollowstone fragments small enough to analyse safely." },
    ],
    currentSituation: `The Hollow advances approximately one zone per day in its current amplified state, with the Black Heart Hollowstone crystal at its centre. In three days, the contamination will reach Fern Crossing — a settlement of sixty people, mostly Greycoat families and three Redpelt elder shamans who have refused to leave. The Grove Wardens have evacuated twice and been overruled by Elder Ashroot, who says the Crossing has something the shamans need that they cannot explain yet. Briar Thornward needs the party to reach the Black Heart, destroy or remove it, and hold the corruption front long enough for the shamans to begin purification rituals.`,
  },

  {
    id: "nightwood-hollows",
    name: "The Nightwood Hollows",
    icon: "🕯️",
    enemy: "Owl Court Nobles",
    quest: "The Feather Tax",
    region: "Middle canopy — the layer of perpetual twilight between the city platforms above and the forest floor below",
    environment: `The Nightwood Hollows are not dark in the Elder Grove's heavy, time-pressed way. They are lit — just not by the sun. Bioluminescent moss covers every surface in shifting blue-green sheets that brighten and dim with the temperature, pulsing faintly when disturbed. Ancient Owl Court temples carved directly into living trees glow with this light at their entrances, like mouths breathing light instead of air. The air here is cool even in midsummer, carrying the specific smell of bioluminescence: a faint metallic sweetness, like rain on hot stone.

Sound behaves differently in the Hollows. The dense vegetation and the shape of the hollows create pockets of eerie silence and unexpected echo. A whisper in the right location can be heard fifty metres away. A shout in the wrong location vanishes entirely. The Owl Courts know these acoustic properties intimately and have built their patrol routes around them. The Night Guild knows the same information and has built their movement patterns around the Owl Courts' routes.

At the lowest levels of the Hollows, where old roots create natural rooms and the bioluminescent moss is thickest, the Night Market operates. It runs without lanterns — the moss is sufficient light if you know where to look. During the day (such as it is), this area appears to be empty storage roots. The transformation begins three hours after what serves as sunset here.`,
    history: `The Nightwood Hollows were the Owl Courts' domain before squirrel-kind had names for the different canopy levels. The Courts built their temples here — enormous carved spaces in ancient tree hollows, decorated with feather-patterns and the ancient script the Owls used before they adopted the common tongue. When squirrel-kind expanded into the middle canopy, the Shadowtail communities that established themselves in the Hollows did so with one eye on the temple architecture and the other on the patrol routes.

The relationship between Shadowtail communities and the Owl Courts was always transactional: tolerated presence in exchange for intelligence services. For centuries, the arrangement worked. The Cutting destroyed it not by changing the arrangement but by removing the Yggdorn-backed framework that had made non-compliance costly for the Courts.`,
    nativePopulations: [
      { name: "Shadowtail Night Guild cells", desc: "Small, dispersed, and deliberately uncoordinated for security reasons. No single cell knows the full extent of the network." },
      { name: "Owl Court patrol squads", desc: "Three-Noble patrols running six-hour rotations, coordinated with House Gilt-funded Enforcer backup at the Hollow's exits." },
      { name: "Palewhisker hermits", desc: "Three known Palewhiskers living in deep Hollow solitude, approached by the Courts but refusing contact. Two have agreed to occasional Shadowtail visits." },
      { name: "Night Market community", desc: "A fluid population of traders, information brokers, refugees, and opportunists who maintain no permanent address." },
    ],
    pointsOfInterest: [
      { name: "The Temple of Hollow Eyes", desc: "The largest Owl Court temple — a carved hollow the size of a city block, lit by bioluminescent pillars and decorated with a thousand years of Owl Court history in carved relief. Duke Moonfeather holds court here. The temple's inner sanctum contains the original Ancient Pact document, now technically void. Elder Hush keeps it." },
      { name: "The Night Market", desc: "Invisible by day; a full commercial district by night. The Market's location shifts every three nights on a rotation that the Night Guild coordinates. Last known location: the root-hall behind the Temple of Hollow Eyes' east entrance." },
      { name: "The Pale Stone", desc: "A fragment of Yggdorn's upper branch system that fell into the Hollows during the Cutting and has remained here, partially embedded in living bark. The Palewhisker hermits visit it regularly. It faintly glows, which the bioluminescent moss around it has adapted to match." },
    ],
    businessesAndInns: [
      { name: "The Dimglow Den", type: "Inn — Night Guild Front", desc: "A perfectly ordinary inn that rents beds and sells acorn-beer and provides a safe room in the basement for Night Guild operatives who need to not exist for a few days. The proprietor is a cheerful Shadowtail named Wren who has worked for the Guild for thirty years and continues to find the work interesting." },
      { name: "Shadow's Edge Trading", type: "Black Market", desc: "No fixed address. A Shadow's Edge agent finds you at the Night Market if you're buying or selling things that don't exist officially. Everything is available. Payment is in information, services, or specific rare materials — Shadow's Edge has more acorns than it needs." },
      { name: "Moth's Candlemaker", type: "Shop — Information Broker", desc: "A perfectly real candle shop that sells excellent candles and also, for the right price and with the right introduction, any information that has passed through the Nightwood Hollows in the last three years. Moth attends the Night Market as a vendor but the real business happens in the back of the candle shop during business hours." },
    ],
    currentSituation: `The Feather Tax collection is in nine days. Three Hollow settlements have not yet submitted their tribute. Duke Moonfeather has given notice that non-compliant settlements will receive a Hunt — an Owl Court enforcement action that is officially a tax recovery measure and practically indistinguishable from a raid. The Night Guild has been moving the at-risk populations but needs more time. Elder Hush has sent, through indirect channels, a suggestion that there may be something in the Temple of Hollow Eyes' inner sanctum — specifically regarding the Ancient Pact — that would give the Owl Courts legal grounds to void the Tax under their own law. Accessing the inner sanctum requires getting past a Noble Gaze and three patrol rotations without triggering the Hunt early.`,
  },

  {
    id: "sky-root-peaks",
    name: "The Sky-Root Peaks",
    icon: "⛰️",
    enemy: "Rogue Spirits",
    quest: "The Untethered Storm",
    region: "Upper canopy — the highest branch-tips and open sky platforms of the tallest trees",
    environment: `At the Sky-Root Peaks, the world inverts. Below is forest — distant, green, incomprehensibly far down. Above is sky — enormous and immediate and every colour of weather simultaneously because you are in the clouds, not looking up at them. The wind is constant. Not the occasional gust of lower canopy life but a permanent structural feature, something you lean into instead of being surprised by. Glideborn children are taught to walk into wind before they're taught to walk without it.

The settlements here are engineering solutions to an engineering problem: how do you build homes in a place that wants to throw them off? The answer involves deeply driven root-anchors, connecting cables of braided bark-vine that absorb wind stress rather than resisting it, and an aesthetic that accepts motion as a permanent feature of architecture. Glideborn homes sway. This is correct. Homes that don't sway here usually don't last.

Since the Storm That Remembers began its expansion two years ago, the aesthetic has shifted. Newer structures are lower, more anchored, less optimised for beauty. Some older platforms have been abandoned — remarkable structures of woven bark and ancient timber, left because the maintenance cost when a storm spirit might tear them apart on any given night has become unsustainable.`,
    history: `The Sky-Root Peaks were Glideborn territory from before the Canopy Cities existed. The Sky Treaty formalised what was practical reality: the Glideborn were the only folk capable of living here comfortably, and the only folk capable of maintaining the message networks the lower canopies needed. In exchange for recognized sovereignty and free travel rights, Glideborn couriers carried the dispatches that kept Acornia's economies and politics functioning.

The spiritual dimension of the Peaks was always present: the sky-spirits, the thermals maintained by spirit-interaction with the weather systems, the Binding Stones that anchored the ancient storm spirits to specific territories. The Glideborn maintained the Binding Stone rituals as a matter of cultural practice, without fully understanding the spiritual mechanisms involved. When Yggdorn fell and the mechanisms failed, the rituals continued for several months before anyone realized that the Stones were no longer responding.`,
    nativePopulations: [
      { name: "Glideborn clans", desc: "Seven clans maintaining six summit settlements. One settlement destroyed by the storm; its clan members distributed across the remaining five." },
      { name: "Bound sky-spirits (rare)", desc: "A handful of minor sky-spirits whose Binding Stones remain partially functional. They are confused, frightened, and not dangerous if treated carefully." },
      { name: "The Storm That Remembers", desc: "Present across the entire upper Peaks. Its 'centre' shifts; its presence is felt everywhere through unnatural weather." },
    ],
    pointsOfInterest: [
      { name: "The Binding Stones", desc: "Seven ancient ritual anchor-points carved into the highest accessible rock faces. Four are significantly cracked. Two are fully shattered. The seventh — the largest, in the Storm Eye — is intact but the ritual required to use it requires a working spirit-binding and a Palewhisker presence, ideally." },
      { name: "Skymother's Roost", desc: "Aerith's home and the closest thing the Peaks have to a civic centre — a large, heavily anchored structure at the protected lee side of the tallest peak. Community meetings happen here; the Resistance's Sky Speaker network is coordinated from the back rooms." },
      { name: "The Storm Eye", desc: "The spatial centre of the rogue spirit's activity — a platform that was once a meditation and ritual space. Now permanently wreathed in unnatural fog and intermittent lightning. The intact Binding Stone is here. Getting to it in current conditions requires excellent Agility and significant luck." },
    ],
    businessesAndInns: [
      { name: "The High Perch Inn", type: "Inn & Tavern", desc: "The highest inn in Acornia by strict elevation measurement, the High Perch is built around the most stable support column on the main settlement's central platform. It sways approximately 3 degrees in high wind. The proprietor, a massive Glideborn named Tumble, is extremely proud of this number and will tell you about it." },
      { name: "Aerith's Workshop", type: "Spirit-Binding Equipment", desc: "Not a commercial operation — Aerith makes and repairs ritual equipment as a matter of necessity, not profit. She'll help someone who comes to her with genuine need for spirit-binding tools, but she wants to know why, and she'll remember if the answer was wrong." },
      { name: "Wing & Wind Outfitters", type: "Aerial Equipment", desc: "Everything needed for extended aerial travel: glide-cloak repairs, wind-reading instruments, thermal maps (updated weekly by volunteer Glideborn scouts), altitude medicines for non-Glideborn visitors who experience altitude difficulties, and a very good selection of provisions optimised for high-altitude nutrition." },
    ],
    currentSituation: `The Storm That Remembers destroyed the Hillcrest settlement three days ago — its fourth major destruction in two years. Seventeen residents are unaccounted for. Skymother Aerith has announced her assessment publicly for the first time: without a successful spirit-binding using the intact Binding Stone in the Storm Eye, the remaining five settlements will be destroyed within the season. She needs three things she doesn't have: a Palewhisker who can interpret the Spirit's attempts at communication, a Shaman who can hold a Spirit Commune long enough to attempt a binding, and someone with exceptional Agility to physically reach the Binding Stone through current Storm Eye conditions.`,
  },

  {
    id: "wander-paths",
    name: "The Wander-Paths",
    icon: "🗺️",
    enemy: "All Factions",
    quest: "The Last Map",
    region: "Between all canopies — ancient surface roads, underground root-tunnels, and unmapped wilderness",
    environment: `The Wander-Paths are not a place. They are the spaces between places — the old roads that connected all five canopies when Yggdorn's spiritual network made navigation easy and the world seemed smaller than it actually is. Without the World Tree's guidance, the paths have been reverting to wilderness for four years.

Some sections are still clear — ancient stone-root roads that have survived millennia and will survive several more, laid by the first Yggdorn pilgrims in a style that solved rain drainage with a precision modern engineers would find elegant. Other sections have been swallowed by undergrowth that the spiritual circulation once kept in check. And other sections exist in the territory between factions — officially belonging to none of them, which means all of them send patrols.

The Paths vary dramatically by section. The surface roads through old-growth forest are breathtaking — enormous trees arching over ancient roads, morning light coming through canopy gaps in shafts you could read by, the particular silence of places that humans have walked for centuries but never settled. The underground tunnel sections are different: root-halls carved through the earth beneath the canopy, lit by stone-embedded bioluminescent minerals, temperature-stable regardless of surface conditions, and occasionally occupied by the fungi-folk — barrel-shaped creatures of slow intelligence who have lived in the deepest tunnels since before squirrel-kind arrived and who have not yet decided what to make of the current occupation situation.`,
    history: `The Wander-Paths were built by Yggdorn pilgrims — folk from all five canopies who made the long journey to the World Tree for guidance, healing, or simply for the experience of being in the World Tree's presence. For millennia, the paths were maintained by the Keeper's Road Guild, an organisation of all-folk volunteers who considered path maintenance a spiritual practice equivalent to any formal ritual.

When Yggdorn fell, the Guild dissolved within weeks — not from lack of will but from lack of coordination. With the Spirit Road network down and the Sky Speaker network not yet established, the Guild's different canopy chapters couldn't reach each other. The paths began their return to wilderness. The Barons put checkpoints on the sections they controlled, turning the ancient pilgrimage roads into toll roads, which many people consider the most accurate metaphor for Baron governance generally.`,
    nativePopulations: [
      { name: "Wandering scholars and refugees", desc: "The Paths are currently used by anyone who needs to move between canopies without going through Baron checkpoints." },
      { name: "The Fungi-folk", desc: "Slow-moving, slow-thinking creatures of underground root-halls who have been here since before the canopy folk and who are carefully neutral in all above-ground politics." },
      { name: "All faction patrols", desc: "Baron Enforcers on the toll roads; occasional Owl Court aerial patrol; Night Guild couriers; Sky Speakers with messages; Warden scouts from the Elder Grove." },
    ],
    pointsOfInterest: [
      { name: "The Final Waypoint", desc: "The last waypoint before the road to Yggdorn's location — a ancient stone structure with a roof that has survived four years of neglect better than anything built in the last century. The dying cartographer's maps all point here. What's here, exactly, beyond the waypoint structure, is what the maps are needed to determine." },
      { name: "The Yggdorn Shrine (Route Marker Seven)", desc: "One of several ancient shrines marking the old pilgrimage route. This one is functionally intact — the ritual stones still respond to Shaman Insight rolls, the spiritual resonance hasn't fully dissipated. It repels Hollow corruption. It could be a stronghold or resupply point if cleared." },
      { name: "The Baron Checkpoint", desc: "General Scrawl's mobile command post — a highly militarised position at the major path junction where four road sections converge. Approximately forty Enforcers, cross-bow mounted platforms, and Scrawl himself when he's in the region." },
    ],
    businessesAndInns: [
      { name: "The Waypoint Rest", type: "Inn — Rough", desc: "The last functioning inn on the Paths, operated by a cynical Greycoat named Barrow who has survived four years of shifting faction control by selling food and beds to anyone who can pay and information to anyone who can pay more. Barrow's prices are extortionate. Barrow's beds are safe. This is a trade most travellers make." },
      { name: "Cartographer's Camp", type: "Temporary — Information", desc: "The dying cartographer's camp: a collapsed tree-hollow with maps pinned to every interior surface. The cartographer, Skein, is here and is dying of a Hollow-adjacent infection contracted in the Elder Grove. The maps are complete. Skein will trade them for a Healing Poultice and a promise: that whoever takes them will use them to find Yggdorn rather than sell them to a faction." },
      { name: "The Bone Toll", type: "Baron Checkpoint", desc: "What the Waypoint Rest's locals call the Baron checkpoint — unofficial name. Tolls are technically set by the Iron Decree but the actual rates depend on the individual Enforcer on duty, the time of day, and whether the traveller in question looks like someone who might have money they haven't declared." },
    ],
    currentSituation: `Skein the cartographer has three days, maybe four. The maps to Yggdorn's location are complete and represent four years of work through increasingly dangerous territory. General Scrawl's Enforcer advance team is less than six hours behind the party on the road — Scrawl received intelligence (from House Vox, almost certainly) about the map's completion and has dispatched forces to acquire it. The party arrives at the Waypoint Rest to find Skein waiting, the maps ready, and a single question on the table: which faction gets the path to the World Tree?`,
  },
];
