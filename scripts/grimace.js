/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Grimace": () => (/* binding */ Grimace),
  "main": () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./src/GrimaceMoon.ts
function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var Grimace = /*#__PURE__*/function () {function Grimace() {_classCallCheck(this, Grimace);_defineProperty(this, "dogHairPill",
    external_kolmafia_namespaceObject.Item.get("Dog Hair Pill"));_defineProperty(this, "distendPill",
    external_kolmafia_namespaceObject.Item.get("distention pill"));_defineProperty(this, "mapGrimace",
    external_kolmafia_namespaceObject.Item.get("Map to Safety Shelter Grimace Prime"));_defineProperty(this, "hamCrashed",
    Date.parse("2006-06-03T00:00:00.000-03:30"));}_createClass(Grimace, [{ key: "getMoonPhase", value:

    function getMoonPhase(days) {
      while (days < 0) {days += 96;}

      return ((0,external_kolmafia_namespaceObject.gamedayToInt)() + days + 16) % 16;
    } }, { key: "getHamburglarDarkness", value:

    function getHamburglarDarkness(
    ronaldPhase,
    grimacePhase,
    hamburglarPosition)
    {
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
          return 0;}

    } }, { key: "isAliens", value:

    function isAliens(moonPhrase, day) {
      var phraseStep = (moonPhrase + 16) % 16;
      var ronaldPhrase = phraseStep % 8;
      var grimacePhase = Math.floor(phraseStep / 2);
      var grimaceDarkness = Math.abs(grimacePhase - 4);

      var dayms = 24 * 60 * 60 * 1000;

      var collis = Math.floor(
      (Date.now() + day * dayms - this.hamCrashed) / (24 * 60 * 60 * 1000));


      var hamburglar = collis * 2 % 11;
      var hamDarkness = this.getHamburglarDarkness(
      ronaldPhrase,
      grimacePhase,
      hamburglar);

      var grimaceLight = 4 - grimaceDarkness;
      var grimaceEffect = 4 - grimaceLight + hamDarkness;

      return grimaceEffect < 4;
    } }, { key: "getNextAlienFreeDays", value:

    function getNextAlienFreeDays()


    {var upToDay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.max(50, this.getLeastStock());var maxAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var numbers = [];

      for (var day = 0; numbers.length < maxAmount && day < upToDay; day++) {
        var aliens = this.isAliens(this.getMoonPhase(day), day);

        if (aliens) {
          continue;
        }

        numbers.push(day);
      }

      return numbers;
    } }, { key: "getLeastStock", value:

    function getLeastStock() {
      return Math.min(
      (0,external_kolmafia_namespaceObject.availableAmount)(this.dogHairPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.dogHairPill),
      (0,external_kolmafia_namespaceObject.availableAmount)(this.distendPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.distendPill));

    } }, { key: "isViableToCharacter", value:

    function isViableToCharacter() {
      return (
        (0,external_kolmafia_namespaceObject.pullsRemaining)() == -1 && (0,external_kolmafia_namespaceObject.fullnessLimit)() > 0 && (0,external_kolmafia_namespaceObject.inebrietyLimit)() > 0);

    } }, { key: "printShouldRun", value:

    function printShouldRun() {var checkViable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (checkViable && !this.isViableToCharacter()) {
        return;
      }

      var days = this.getNextAlienFreeDays();

      if ((0,external_kolmafia_namespaceObject.modifierEval)("G") >= 4 != days.includes(0)) {
        (0,external_kolmafia_namespaceObject.print)(
        "My code is wrong about the moon! Best to ping Irrat! My code disagrees with proven code. Their code: Today safe to do grimace moon? " + (
        (0,external_kolmafia_namespaceObject.modifierEval)("G") >= 4),
        "red");

      } else if (days.includes(0)) {
        (0,external_kolmafia_namespaceObject.print)(
        "Today is an alien free day! You could do grimace map farming!",
        "blue");


        days = days.filter((d) => d != 0);
      }

      var leastStock = this.getLeastStock();
      var chancesBeforeRunningOut = days.filter((d) => d <= leastStock).length;

      if (chancesBeforeRunningOut > 5 && leastStock > 10) {
        (0,external_kolmafia_namespaceObject.print)(
        "Grimace farming has " +
        chancesBeforeRunningOut +
        " chances to farm before you run out. You have " +
        this.getLeastStock() +
        " pills/days left. The next alien free day is after " +
        days[0] +
        " rollover" + (
        days[0] != 1 ? "s" : "") +
        " occurs",
        "gray");

        return;
      }

      if (days.length == 0) {
        (0,external_kolmafia_namespaceObject.print)(
        "Oh dear, no days available.. This smells like a bug unfortunately.",
        "red");

        return;
      }

      if (leastStock > 0) {
        (0,external_kolmafia_namespaceObject.print)("You should do some grimace farming soon, you will run out of pills in ".concat(
        leastStock, " days and there are only ").concat(chancesBeforeRunningOut, " ideal days to farm before running out. The best days are after: ").concat(days.join(
        ", "), " rollovers"),

        "red");

        return;
      }

      (0,external_kolmafia_namespaceObject.print)("You should do some grimace map farming, the best days are after: ".concat(
      days.join(
      ", "), " rollovers"),

      "red");

    } }, { key: "burnMaps", value:

    function burnMaps() {
      if ((0,external_kolmafia_namespaceObject.inebrietyLimit)() >= (0,external_kolmafia_namespaceObject.myInebriety)()) {
        (0,external_kolmafia_namespaceObject.print)("This is best run when you're overdrunk!", "red");

        if ((0,external_kolmafia_namespaceObject.isHeadless)()) {
          return;
        } else {
          var confirm = (0,external_kolmafia_namespaceObject.userConfirm)(
          "Would you like to burn maps anyways? Defaults to no in 15 seconds.",
          15000,
          false);


          if (!confirm) {
            return;
          }
        }
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.mapGrimace) == 0) {
        (0,external_kolmafia_namespaceObject.print)("You don't have any maps!", "red");
        return;
      }

      var maps = Math.min((0,external_kolmafia_namespaceObject.availableAmount)(this.mapGrimace), (0,external_kolmafia_namespaceObject.myAdventures)());

      var dog =
      (0,external_kolmafia_namespaceObject.availableAmount)(this.dogHairPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.dogHairPill);
      var distend =
      (0,external_kolmafia_namespaceObject.availableAmount)(this.distendPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.distendPill);
      var transponder = external_kolmafia_namespaceObject.Item.get("transporter transponder");
      var effect = (0,external_kolmafia_namespaceObject.effectModifier)(transponder, "Effect");
      var toUse = Math.ceil((maps - (0,external_kolmafia_namespaceObject.haveEffect)(effect)) / 30);

      var totalIdeal = (maps + dog + distend) / 2;
      var distendMissing = Math.ceil(Math.max(totalIdeal - distend, 0));
      var dogMissing = maps - distendMissing;

      if (maps < 5 && toUse > 0) {
        var _confirm = (0,external_kolmafia_namespaceObject.userConfirm)(
        "You have less than 5 maps, and will need to use a transponder. Confirm?");


        if (!_confirm) {
          (0,external_kolmafia_namespaceObject.print)("User did not confirm, aborted.", "red");
          return;
        }
      }

      (0,external_kolmafia_namespaceObject.print)(
      "Plan: We will be using " +
      maps +
      " maps, using " +
      toUse +
      " transponders. We will acquire " +
      distendMissing +
      " distend pills, and " +
      dogMissing +
      " dog pills. You will have " + (
      distend + distendMissing) +
      " distend pills, " + (
      dog + dogMissing) +
      " dog pills at the end of this.",
      "blue");


      if (toUse > 0) {
        (0,external_kolmafia_namespaceObject.use)(transponder, toUse);
      }

      (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure536", "1");

      while (distendMissing > 0) {
        distendMissing--;
        (0,external_kolmafia_namespaceObject.use)(this.mapGrimace);
      }

      (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure536", "2");

      while (dogMissing > 0) {
        dogMissing--;
        (0,external_kolmafia_namespaceObject.use)(this.mapGrimace);
      }

      (0,external_kolmafia_namespaceObject.print)(
      "Done! You now have " + (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.distendPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.distendPill)) +
      " " +
      this.distendPill.name +
      ", " + (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.dogHairPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.dogHairPill)) +
      " " +
      this.dogHairPill.name,
      "blue");

    } }]);return Grimace;}();


function main() {var goal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "info";
  var grimace = new Grimace();

  if (goal == "maps") {
    grimace.burnMaps();
  } else if (goal == "info") {
    grimace.printShouldRun(false);
  } else {
    (0,external_kolmafia_namespaceObject.print)(
    "Provide 'maps' to burn maps to turn them into pills, or no args (or 'info') to view information about grimace map farming",
    "red");

  }
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;