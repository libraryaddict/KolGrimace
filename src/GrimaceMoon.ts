import {
  gamedayToInt,
  availableAmount,
  pullsRemaining,
  fullnessLimit,
  inebrietyLimit,
  print,
  waitq,
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
} from "kolmafia";

export class Grimace {
  dogHairPill: Item = Item.get("Dog Hair Pill");
  distendPill: Item = Item.get("distention pill");
  mapGrimace: Item = Item.get("Map to Safety Shelter Grimace Prime");
  hamCrashed: number = Date.parse("2006-06-03T00:00:00.000-03:30");

  getMoonPhase(days: number): number {
    while (days < 0) days += 96;

    return (gamedayToInt() + days + 16) % 16;
  }

  getHamburglarDarkness(
    ronaldPhase: number,
    grimacePhase: number,
    hamburglarPosition: number
  ) {
    //         6    5    4    3
    //
    //       /---\          /---\
    //   7   | R |          | G |   2
    //       \___/          \___/
    //
    //       8   9    10    0   1

    switch (hamburglarPosition) {
      case 0:
        if (grimacePhase > 0 && grimacePhase < 5) {
          return 1;
        }
        return -1;

      case 1:
        if (grimacePhase < 4) {
          return -1;
        }
        return 1;

      case 2:
        if (grimacePhase > 3) {
          return 0;
        }
        return 1;

      case 4:
        if (grimacePhase > 0 && grimacePhase < 5) {
          return 0;
        }
        return 1;

      case 5:
        if (ronaldPhase > 3) {
          return 0;
        }
        return 1;

      case 7:
        if (ronaldPhase > 0 && ronaldPhase < 5) {
          return 0;
        }
        return 1;

      case 8:
        if (ronaldPhase > 0 && ronaldPhase < 5) {
          return 1;
        }
        return 0;

      case 9:
        if (ronaldPhase < 4) {
          return 0;
        }
        return 1;

      case 10:
        if (ronaldPhase > 3) {
          return 0;
        }
        if (grimacePhase > 0 && grimacePhase < 5) {
          return 0;
        }
        return 1;

      default:
        return 0;
    }
  }

  isAliens(moonPhrase: number, day: number): boolean {
    let phraseStep = (moonPhrase + 16) % 16;
    let ronaldPhrase = phraseStep % 8;
    let grimacePhase = Math.floor(phraseStep / 2);
    let grimaceDarkness = Math.abs(grimacePhase - 4);

    let dayms = 24 * 60 * 60 * 1000;

    let collis = Math.floor(
      (Date.now() + day * dayms - this.hamCrashed) / (24 * 60 * 60 * 1000)
    );

    let hamburglar = (collis * 2) % 11;
    let hamDarkness = this.getHamburglarDarkness(
      ronaldPhrase,
      grimacePhase,
      hamburglar
    );
    let grimaceLight = 4 - grimaceDarkness;
    let grimaceEffect = 4 - grimaceLight + hamDarkness;

    return grimaceEffect < 4;
  }

  getNextAlienFreeDays(
    upToDay: number = Math.max(50, this.getLeastStock()),
    maxAmount: number = 200
  ): number[] {
    let numbers = [];

    for (let day = 0; numbers.length < maxAmount && day < upToDay; day++) {
      let aliens = this.isAliens(this.getMoonPhase(day), day);

      if (aliens) {
        continue;
      }

      numbers.push(day);
    }

    return numbers;
  }

  getLeastStock(): number {
    return Math.min(
      availableAmount(this.dogHairPill) + storageAmount(this.dogHairPill),
      availableAmount(this.distendPill) + storageAmount(this.distendPill)
    );
  }

  isViableToCharacter(): boolean {
    return (
      pullsRemaining() == -1 && fullnessLimit() > 0 && inebrietyLimit() > 0
    );
  }

  printShouldRun(checkViable: boolean = false) {
    if (checkViable && !this.isViableToCharacter()) {
      return;
    }

    let days = this.getNextAlienFreeDays();

    if (modifierEval("G") >= 4 != days.includes(0)) {
      print(
        "My code is wrong about the moon! Best to ping Irrat! My code disagrees with proven code. Their code: Today safe to do grimace moon? " +
          (modifierEval("G") >= 4),
        "red"
      );
    } else if (days.includes(0)) {
      print(
        "Today is an alien free day! You could do grimace map farming!",
        "blue"
      );

      days = days.filter((d) => d != 0);
    }

    let leastStock = this.getLeastStock();
    let chancesBeforeRunningOut = days.filter((d) => d <= leastStock).length;

    if (chancesBeforeRunningOut > 5 && leastStock > 10) {
      print(
        "Grimace farming has " +
          days.length +
          " chances to farm before you run out. You have " +
          this.getLeastStock() +
          " pills/days left. The next alien free day is after " +
          days[0] +
          " rollover" +
          (days[0] != 1 ? "s" : "") +
          " occurs",
        "gray"
      );
      return;
    }

    if (days.length == 0) {
      print(
        "Oh dear, no days available.. This smells like a bug unfortunately.",
        "red"
      );
      return;
    }

    if (leastStock > 0) {
      print(
        `You should do some grimace farming soon, you will run out of pills in ${leastStock} days and there are only ${chancesBeforeRunningOut} ideal days to farm before running out. The best days are after: ${days.join(
          ", "
        )} rollovers`,
        "red"
      );
      return;
    }

    print(
      `You should do some grimace map farming, the best days are after: ${days.join(
        ", "
      )} rollovers`,
      "red"
    );

    waitq(3);
  }

  burnMaps() {
    if (inebrietyLimit() >= myInebriety()) {
      print("This is best run when you're overdrunk!", "red");

      if (isHeadless()) {
        return;
      } else {
        let confirm = userConfirm(
          "Would you like to burn maps anyways? Defaults to no in 15 seconds.",
          15000,
          false
        );

        if (!confirm) {
          return;
        }
      }
    }

    if (availableAmount(this.mapGrimace) == 0) {
      print("You don't have any maps!", "red");
      return;
    }

    let maps = Math.min(availableAmount(this.mapGrimace), myAdventures());

    let dog =
      availableAmount(this.dogHairPill) + storageAmount(this.dogHairPill);
    let distend =
      availableAmount(this.distendPill) + storageAmount(this.distendPill);
    let transponder = Item.get("transporter transponder");
    let effect = effectModifier(transponder, "Effect");
    let toUse = Math.ceil((maps - haveEffect(effect)) / 30);

    let totalIdeal = (maps + dog + distend) / 2;
    let distendMissing = Math.ceil(Math.max(totalIdeal - distend, 0));
    let dogMissing = maps - distendMissing;

    if (maps < 5 && toUse > 0) {
      let confirm = userConfirm(
        "You have less than 5 maps, and will need to use a transponder. Confirm?"
      );

      if (!confirm) {
        print("User did not confirm, aborted.", "red");
        return;
      }
    }

    print(
      "Plan: We will be using " +
        maps +
        " maps, using " +
        toUse +
        " transponders. We will acquire " +
        distendMissing +
        " distend pills, and " +
        dogMissing +
        " dog pills. You will have " +
        (distend + distendMissing) +
        " distend pills, " +
        (dog + dogMissing) +
        " dog pills at the end of this.",
      "blue"
    );

    if (toUse > 0) {
      use(transponder, toUse);
    }

    setProperty("choiceAdventure536", "1");

    while (distendMissing > 0) {
      distendMissing--;
      use(this.mapGrimace);
    }

    setProperty("choiceAdventure536", "2");

    while (dogMissing > 0) {
      dogMissing--;
      use(this.mapGrimace);
    }

    print(
      "Done! You now have " +
        (availableAmount(this.distendPill) + storageAmount(this.distendPill)) +
        " " +
        this.distendPill.name +
        ", " +
        (availableAmount(this.dogHairPill) + storageAmount(this.dogHairPill)) +
        " " +
        this.dogHairPill.name,
      "blue"
    );
  }
}

export function main(goal: string = "info") {
  let grimace = new Grimace();

  if (goal == "maps") {
    grimace.burnMaps();
  } else if (goal == "info") {
    grimace.printShouldRun(false);
  } else {
    print(
      "Provide 'maps' to burn maps to turn them into pills, or no args (or 'info') to view information about grimace map farming",
      "red"
    );
  }
}
