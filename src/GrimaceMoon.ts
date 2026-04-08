import {
  gamedayToInt,
  availableAmount,
  inebrietyLimit,
  print,
  Item,
  myInebriety,
  effectModifier,
  haveEffect,
  use,
  myAdventures,
  setProperty,
  userConfirm,
  modifierEval,
  isHeadless,
  storageAmount,
  handlingChoice,
  availableChoiceOptions,
  visitUrl,
  lastChoice,
  myHash,
} from "kolmafia";

export class Grimace {
  dogHairPill: Item = Item.get("Dog Hair Pill");
  distendPill: Item = Item.get("distention pill");
  mapGrimace: Item = Item.get("Map to Safety Shelter Grimace Prime");

  hamCrashed: number = Date.parse("2006-06-03T00:00:00.000-03:30");
  dayMs: number = 24 * 60 * 60 * 1000;
  daysOffset: number = 0;
  onlyWhenDrunk = true;
  runChoicesOurselves = true;

  getMoonPhase(daysOffset: number): number {
    return (((gamedayToInt() + daysOffset) % 16) + 16) % 16;
  }

  getHamburglarDarkness(
    ronaldPhase: number,
    grimacePhase: number,
    hamburglarPosition: number,
  ): number {
    //         6    5    4    3
    //
    //       /---\          /---\
    //   7   | R |          | G |   2
    //       \___/          \___/
    //
    //       8   9    10    0   1

    const gWaxing = grimacePhase > 0 && grimacePhase < 5;
    const gWaning = grimacePhase >= 4;
    const rWaxing = ronaldPhase > 0 && ronaldPhase < 5;
    const rWaning = ronaldPhase >= 4;

    // A shadow casting map based on Hamburglar's position (0-10) around the moons
    const darknessOffsets = [
      gWaxing ? 1 : -1, // 0
      gWaning ? 1 : -1, // 1
      gWaning ? 0 : 1, // 2
      0, // 3
      gWaxing ? 0 : 1, // 4
      rWaning ? 0 : 1, // 5
      0, // 6
      rWaxing ? 0 : 1, // 7
      rWaxing ? 1 : 0, // 8
      rWaning ? 1 : 0, // 9
      rWaning || gWaxing ? 0 : 1, // 10
    ];

    return darknessOffsets[hamburglarPosition] ?? 0;
  }

  getGrimaceLight(dayOffset: number): number {
    dayOffset += this.daysOffset;

    const moonPhase = this.getMoonPhase(dayOffset);
    const ronaldPhase = moonPhase % 8;
    const grimacePhase = Math.floor(moonPhase / 2);
    const grimaceDarkness = Math.abs(grimacePhase - 4);

    const collis = Math.floor(
      (Date.now() + dayOffset * this.dayMs - this.hamCrashed) / this.dayMs,
    );
    const hamburglar = (collis * 2) % 11;
    const hamDarkness = this.getHamburglarDarkness(
      ronaldPhase,
      grimacePhase,
      hamburglar,
    );

    // Total light translates to 5 segments minus its natural darkness and Hamburglar's shadow
    return 5 - (grimaceDarkness + hamDarkness);
  }

  getAlienEncounters(dayOffset: number): number {
    const lit = this.getGrimaceLight(dayOffset);

    return lit <= 1 ? 0 : lit / 12;
  }

  isAliens(dayOffset: number): boolean {
    return this.getAlienEncounters(dayOffset) > 0;
  }

  getNextAlienFreeDays(
    upToDay: number = Math.max(
      50,
      Math.min(this.countDog(), this.countDistend()),
    ),
    maxAmount: number = 200,
  ): number[] {
    const safeDays: number[] = [];

    for (let day = 0; safeDays.length < maxAmount && day < upToDay; day++) {
      if (!this.isAliens(day)) {
        safeDays.push(day);
      }
    }

    return safeDays;
  }

  saveEncountersPref() {
    const chances = Array.from({ length: 10 }, (_, i) =>
      Math.round(100 * this.getAlienEncounters(i)),
    );
    setProperty("_grimaceAlienEncounters", chances.join(","));
  }

  printShouldRun() {
    this.saveEncountersPref();

    // Array of days that have 0% aliens
    let alienFreeDays = this.getNextAlienFreeDays();
    const hasSafeToday = alienFreeDays.includes(0);

    if (this.daysOffset == 0 && modifierEval("G") >= 4 != hasSafeToday) {
      print(
        `My code is wrong about the moon! Best to ping Irrat! Code disagrees with mafia data. Safe today? ${modifierEval("G") >= 4}`,
        "red",
      );
    } else if (hasSafeToday) {
      print(
        `${this.daysOffset != 0 ? "That day" : "Today"} is an alien free day! You could do grimace map farming!`,
        "blue",
      );
      // We remove 'today' because we want to show only the future days in following code.
      alienFreeDays = alienFreeDays.filter((d) => d != 0);
    }

    const encounters = () => {
      if (hasSafeToday) {
        return;
      }

      const chances = Array.from(
        { length: 10 },
        (_, i) => `${Math.round(100 * this.getAlienEncounters(i))}%`,
      ).join(", ");

      print(
        `Alien encounters chances, starting ${this.daysOffset != 0 ? "that day" : "today"}: ${chances}`,
        "gray",
      );
    };

    const leastStock = Math.min(this.countDog(), this.countDistend());
    const chancesBeforeRunningOut = alienFreeDays.filter(
      (d) => d <= leastStock,
    ).length;

    if (chancesBeforeRunningOut > 5 && leastStock > 10) {
      print(
        `Grimace farming has ${chancesBeforeRunningOut} chances to farm before you run out. You have ${leastStock} pills/days left. The next alien free day is after ${alienFreeDays[0]} rollover${alienFreeDays[0] != 1 ? "s" : ""} occurs`,
        "gray",
      );
      encounters();

      return;
    }

    if (alienFreeDays.length == 0) {
      print(
        "Oh dear, no days available.. This smells like a bug unfortunately.",
        "red",
      );

      return;
    }

    if (leastStock > 0) {
      print(
        `You should do some grimace farming soon, you will run out of pills in ${leastStock} days and there are only ${chancesBeforeRunningOut} ideal days to farm before running out. The best days are after: ${alienFreeDays.join(", ")} rollovers`,
        "red",
      );
    } else {
      print(
        `You should do some grimace map farming, the best days are after: ${alienFreeDays.join(", ")} rollovers`,
        "red",
      );
    }

    encounters();
  }

  countDog(): number {
    return availableAmount(this.dogHairPill) + storageAmount(this.dogHairPill);
  }

  countDistend(): number {
    return availableAmount(this.distendPill) + storageAmount(this.distendPill);
  }

  burnMaps() {
    if (this.onlyWhenDrunk && myInebriety() <= inebrietyLimit()) {
      print(
        "This is best run when you're overdrunk! Provide 'override' to skip this check.",
        "red",
      );

      if (isHeadless()) {
        return;
      }

      if (
        !userConfirm(
          "Would you like to burn maps anyways? Defaults to no in 15 seconds.",
          15000,
          false,
        )
      ) {
        return;
      }
    }

    const availableMaps = availableAmount(this.mapGrimace);

    if (availableMaps == 0) {
      print("You don't have any maps!", "red");

      return;
    }

    if (myAdventures() == 0) {
      print(`You have no adventures, yet ${availableMaps} maps to use!`, "red");

      return;
    }

    const maps = Math.min(availableMaps, myAdventures());

    const dog = this.countDog();
    const distend = this.countDistend();

    const transponder = Item.get("transporter transponder");
    const transponderEffect = effectModifier(transponder, "Effect");
    const effectTurns = () => haveEffect(transponderEffect);
    let transpondersToUse = Math.max(0, Math.ceil((maps - effectTurns()) / 30));

    let totalIdeal = 0;
    let distendMissing = 0;
    let dogMissing = 0;

    const compute = (maps: number) => {
      totalIdeal = (maps + dog + distend) / 2;
      distendMissing = Math.ceil(Math.max(totalIdeal - distend, 0));
      dogMissing = maps - distendMissing;

      print(
        `Plan: We will be using ${maps} maps, using ${transpondersToUse} transponder${transpondersToUse != 1 ? "s" : ""}. We will acquire ${distendMissing} ${this.distendPill.name}, and ${dogMissing} ${this.dogHairPill.plural}. You will have ${distend + distendMissing} ${this.distendPill.plural}, ${dog + dogMissing} ${this.dogHairPill.plural} at the end of this.`,
        "blue",
      );
    };

    compute(maps);

    if (transpondersToUse > 0) {
      use(transpondersToUse, transponder);

      const turns = effectTurns();

      if (turns < maps) {
        print(
          `Uh oh! Failed to ensure transponder effect, expected to use ${transpondersToUse} transponders for ${transpondersToUse * 30 + (turns % 30)} total turns, but have only ${turns} turns.`,
          "red",
        );

        if (turns > 0) {
          print(`Recalculating...`, "blue");
          transpondersToUse = 0;
          compute(turns);
        } else {
          throw "Failed to ensure enough turns of " + transponderEffect.name;
        }
      }
    }

    const toRun: {
      count: number;
      choiceOption: string;
      choiceName: string;
    }[] = [
      {
        count: distendMissing,
        choiceOption: "1",
        choiceName: "Follow Captain Smirk",
      },
      {
        count: dogMissing,
        choiceOption: "2",
        choiceName: "Follow the Green Girl",
      },
    ];

    const initialChoices = [
      "Down the Hatch!",
      "Have a Drink",
      "Try That One Door",
    ];

    for (const run of toRun) {
      if (run.count <= 0) {
        continue;
      }

      const choicesToPick = [...initialChoices, run.choiceName];

      if (!this.runChoicesOurselves) {
        setProperty("choiceAdventure536", run.choiceOption);
      }

      for (let i = 0; i < run.count; i++) {
        if (this.runChoicesOurselves) {
          visitUrl(
            `inv_use.php?whichitem=${this.mapGrimace.id}&pwd=${myHash()}`,
            false,
            true,
          );
        } else {
          use(1, this.mapGrimace);
        }

        // Fallback when mafia fails (eg, http errored)
        if (handlingChoice()) {
          this.runChoicesManually(choicesToPick);
        }
      }
    }

    print(
      `Done! You now have ${this.countDistend()} ${this.distendPill.plural}, ${this.countDog()} ${this.dogHairPill.plural}`,
      "blue",
    );

    if (availableAmount(this.mapGrimace) > 0) {
      print(
        `You have ${availableAmount(this.mapGrimace)} grimace maps left`,
        "gray",
      );
    }
  }

  sanitizeKey(key: string): string {
    return key
      .toLowerCase()
      .replaceAll(/[^a-zA-Z ]/g, "")
      .replaceAll(/ {2}/g, " ")
      .trim();
  }

  runChoicesManually(prioritized: string[]) {
    // Ensure that minor differences in how kol does stuff doesn't throw this script off
    prioritized = prioritized.map((s) => this.sanitizeKey(s));

    for (let i = 0; i < 10 && handlingChoice(); i++) {
      const choices = availableChoiceOptions();
      let optionToSelect: string;

      for (const key of Object.keys(choices)) {
        const optionDesc: string = choices[key];

        // If the choice isn't in our list of choices
        if (!prioritized.includes(this.sanitizeKey(optionDesc))) {
          continue;
        }

        optionToSelect = key;
        break;
      }

      // If we have no idea where we are
      if (optionToSelect == null) {
        throw "Uh oh, we're in a choice we do not recognize!";
      }

      visitUrl(
        `choice.php?whichchoice=${lastChoice()}&option=${optionToSelect}&pwd=${myHash()}`,
      );
    }
  }
}

export function main(providedArgs: string = "info") {
  const grimace = new Grimace();

  const args = providedArgs.split(" ").filter((s) => s.trim().length > 0);
  const goals: string[] = [];
  const unhandled: string[] = [];

  for (const arg of args) {
    if (/^-?\d{1,6}$/.test(arg)) {
      grimace.daysOffset = parseInt(arg);
    } else if (/^override$/i.test(arg)) {
      grimace.onlyWhenDrunk = false;
    } else if (/^choices$/i.test(arg)) {
      // Not listed in help, it's for testing as mafia can already handle this (unless http error)
      grimace.runChoicesOurselves = true;
    } else if (/^auto$/i.test(arg)) {
      // Not listed in help, it's for testing as mafia can already handle this (unless http error)
      grimace.runChoicesOurselves = false;
    } else if (/^maps$/i.test(arg)) {
      goals.push(arg.toLowerCase());
    } else if (/^info$/i.test(arg)) {
      goals.push(arg.toLowerCase());
    } else if (/^pref$/i.test(arg)) {
      goals.push(arg.toLowerCase());
    } else {
      unhandled.push(arg);
    }
  }

  if (goals.length == 0) {
    goals.push("info");
  }

  if (unhandled.length > 0) {
    print(`Invalid arguments provided: ${unhandled.join(", ")}`, "red");

    print(
      `Provide 'maps' to turn your maps into pills, or no args (or 'info') to view information about grimace map farming. Provide  Provide 'pref' to quietly save a pref of the next 10 days chances of encountering an alien. Provide a number to offset the calculations by that many days, eg '6'. Provide 'override' to skip the 'only if overdrunk' check.`,
      "red",
    );

    return;
  }

  if (goals.includes("maps")) {
    grimace.burnMaps();
  }

  if (goals.includes("info")) {
    grimace.printShouldRun();
  } else if (goals.includes("pref")) {
    grimace.saveEncountersPref();
  }
}
