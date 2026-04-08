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
  Grimace: () => (/* binding */ Grimace),
  main: () => (/* binding */ main)
});

;// external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// ./src/GrimaceMoon.ts
function _typeof(o) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {return typeof o;} : function (o) {return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;}, _typeof(o);}function _createForOfIteratorHelper(r, e) {var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];if (!t) {if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {t && (r = t);var _n = 0,F = function F() {};return { s: F, n: function n() {return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };}, e: function e(r) {throw r;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var o,a = !0,u = !1;return { s: function s() {t = t.call(r);}, n: function n() {var r = t.next();return a = r.done, r;}, e: function e(r) {u = !0, o = r;}, f: function f() {try {a || null == t.return || t.return();} finally {if (u) throw o;}} };}function _unsupportedIterableToArray(r, a) {if (r) {if ("string" == typeof r) return _arrayLikeToArray(r, a);var t = {}.toString.call(r).slice(8, -1);return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;}}function _arrayLikeToArray(r, a) {(null == a || a > r.length) && (a = r.length);for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];return n;}function _classCallCheck(a, n) {if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");}function _defineProperties(e, r) {for (var t = 0; t < r.length; t++) {var o = r[t];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);}}function _createClass(e, r, t) {return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;}function _defineProperty(e, r, t) {return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;}function _toPropertyKey(t) {var i = _toPrimitive(t, "string");return "symbol" == _typeof(i) ? i : i + "";}function _toPrimitive(t, r) {if ("object" != _typeof(t) || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != _typeof(i)) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}

var Grimace = /*#__PURE__*/function () {function Grimace() {_classCallCheck(this, Grimace);_defineProperty(this, "dogHairPill",
    external_kolmafia_namespaceObject.Item.get("Dog Hair Pill"));_defineProperty(this, "distendPill",
    external_kolmafia_namespaceObject.Item.get("distention pill"));_defineProperty(this, "mapGrimace",
    external_kolmafia_namespaceObject.Item.get("Map to Safety Shelter Grimace Prime"));_defineProperty(this, "hamCrashed",

    Date.parse("2006-06-03T00:00:00.000-03:30"));_defineProperty(this, "dayMs",
    24 * 60 * 60 * 1000);_defineProperty(this, "daysOffset",
    0);_defineProperty(this, "onlyWhenDrunk",
    true);_defineProperty(this, "runChoicesOurselves",
    true);}return _createClass(Grimace, [{ key: "getMoonPhase", value:

    function getMoonPhase(daysOffset) {
      return (((0,external_kolmafia_namespaceObject.gamedayToInt)() + daysOffset) % 16 + 16) % 16;
    } }, { key: "getHamburglarDarkness", value:

    function getHamburglarDarkness(
    ronaldPhase,
    grimacePhase,
    hamburglarPosition)
    {var _darknessOffsets$hamb;
      //         6    5    4    3
      //
      //       /---\          /---\
      //   7   | R |          | G |   2
      //       \___/          \___/
      //
      //       8   9    10    0   1

      var gWaxing = grimacePhase > 0 && grimacePhase < 5;
      var gWaning = grimacePhase >= 4;
      var rWaxing = ronaldPhase > 0 && ronaldPhase < 5;
      var rWaning = ronaldPhase >= 4;

      // A shadow casting map based on Hamburglar's position (0-10) around the moons
      var darknessOffsets = [
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
      rWaning || gWaxing ? 0 : 1 // 10
      ];

      return (_darknessOffsets$hamb = darknessOffsets[hamburglarPosition]) !== null && _darknessOffsets$hamb !== void 0 ? _darknessOffsets$hamb : 0;
    } }, { key: "getGrimaceLight", value:

    function getGrimaceLight(dayOffset) {
      dayOffset += this.daysOffset;

      var moonPhase = this.getMoonPhase(dayOffset);
      var ronaldPhase = moonPhase % 8;
      var grimacePhase = Math.floor(moonPhase / 2);
      var grimaceDarkness = Math.abs(grimacePhase - 4);

      var collis = Math.floor(
        (Date.now() + dayOffset * this.dayMs - this.hamCrashed) / this.dayMs
      );
      var hamburglar = collis * 2 % 11;
      var hamDarkness = this.getHamburglarDarkness(
        ronaldPhase,
        grimacePhase,
        hamburglar
      );

      // Total light translates to 5 segments minus its natural darkness and Hamburglar's shadow
      return 5 - (grimaceDarkness + hamDarkness);
    } }, { key: "getAlienEncounters", value:

    function getAlienEncounters(dayOffset) {
      var lit = this.getGrimaceLight(dayOffset);

      return lit <= 1 ? 0 : lit / 12;
    } }, { key: "isAliens", value:

    function isAliens(dayOffset) {
      return this.getAlienEncounters(dayOffset) > 0;
    } }, { key: "getNextAlienFreeDays", value:

    function getNextAlienFreeDays()





    {var upToDay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.max(50, Math.min(this.countDog(), this.countDistend()));var maxAmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var safeDays = [];

      for (var day = 0; safeDays.length < maxAmount && day < upToDay; day++) {
        if (!this.isAliens(day)) {
          safeDays.push(day);
        }
      }

      return safeDays;
    } }, { key: "saveEncountersPref", value:

    function saveEncountersPref() {
      var chances = Array.from({ length: 10 }, (_, i) =>
      Math.round(100 * this.getAlienEncounters(i))
      );
      (0,external_kolmafia_namespaceObject.setProperty)("_grimaceAlienEncounters", chances.join(","));
    } }, { key: "printShouldRun", value:

    function printShouldRun() {
      this.saveEncountersPref();

      // Array of days that have 0% aliens
      var alienFreeDays = this.getNextAlienFreeDays();
      var hasSafeToday = alienFreeDays.includes(0);

      if (this.daysOffset == 0 && (0,external_kolmafia_namespaceObject.modifierEval)("G") >= 4 != hasSafeToday) {
        (0,external_kolmafia_namespaceObject.print)("My code is wrong about the moon! Best to ping Irrat! Code disagrees with mafia data. Safe today? ".concat(
          (0,external_kolmafia_namespaceObject.modifierEval)("G") >= 4),
        "red"
        );
      } else if (hasSafeToday) {
        (0,external_kolmafia_namespaceObject.print)("".concat(
          this.daysOffset != 0 ? "That day" : "Today", " is an alien free day! You could do grimace map farming!"),
        "blue"
        );
        // We remove 'today' because we want to show only the future days in following code.
        alienFreeDays = alienFreeDays.filter((d) => d != 0);
      }

      var encounters = () => {
        if (hasSafeToday) {
          return;
        }

        var chances = Array.from(
          { length: 10 },
          (_, i) => "".concat(Math.round(100 * this.getAlienEncounters(i)), "%")
        ).join(", ");

        (0,external_kolmafia_namespaceObject.print)("Alien encounters chances, starting ".concat(
          this.daysOffset != 0 ? "that day" : "today", ": ").concat(chances),
        "gray"
        );
      };

      var leastStock = Math.min(this.countDog(), this.countDistend());
      var chancesBeforeRunningOut = alienFreeDays.filter(
        (d) => d <= leastStock
      ).length;

      if (chancesBeforeRunningOut > 5 && leastStock > 10) {
        (0,external_kolmafia_namespaceObject.print)("Grimace farming has ".concat(
          chancesBeforeRunningOut, " chances to farm before you run out. You have ").concat(leastStock, " pills/days left. The next alien free day is after ").concat(alienFreeDays[0], " rollover").concat(alienFreeDays[0] != 1 ? "s" : "", " occurs"),
        "gray"
        );
        encounters();

        return;
      }

      if (alienFreeDays.length == 0) {
        (0,external_kolmafia_namespaceObject.print)(
          "Oh dear, no days available.. This smells like a bug unfortunately.",
          "red"
        );

        return;
      }

      if (leastStock > 0) {
        (0,external_kolmafia_namespaceObject.print)("You should do some grimace farming soon, you will run out of pills in ".concat(
          leastStock, " days and there are only ").concat(chancesBeforeRunningOut, " ideal days to farm before running out. The best days are after: ").concat(alienFreeDays.join(", "), " rollovers"),
        "red"
        );
      } else {
        (0,external_kolmafia_namespaceObject.print)("You should do some grimace map farming, the best days are after: ".concat(
          alienFreeDays.join(", "), " rollovers"),
        "red"
        );
      }

      encounters();
    } }, { key: "countDog", value:

    function countDog() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.dogHairPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.dogHairPill);
    } }, { key: "countDistend", value:

    function countDistend() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.distendPill) + (0,external_kolmafia_namespaceObject.storageAmount)(this.distendPill);
    } }, { key: "burnMaps", value:

    function burnMaps() {
      if (this.onlyWhenDrunk && (0,external_kolmafia_namespaceObject.myInebriety)() <= (0,external_kolmafia_namespaceObject.inebrietyLimit)()) {
        (0,external_kolmafia_namespaceObject.print)(
          "This is best run when you're overdrunk! Provide 'override' to skip this check.",
          "red"
        );

        if ((0,external_kolmafia_namespaceObject.isHeadless)()) {
          return;
        }

        if (
        !(0,external_kolmafia_namespaceObject.userConfirm)(
          "Would you like to burn maps anyways? Defaults to no in 15 seconds.",
          15000,
          false
        ))
        {
          return;
        }
      }

      var availableMaps = (0,external_kolmafia_namespaceObject.availableAmount)(this.mapGrimace);

      if (availableMaps == 0) {
        (0,external_kolmafia_namespaceObject.print)("You don't have any maps!", "red");

        return;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() == 0) {
        (0,external_kolmafia_namespaceObject.print)("You have no adventures, yet ".concat(availableMaps, " maps to use!"), "red");

        return;
      }

      var maps = Math.min(availableMaps, (0,external_kolmafia_namespaceObject.myAdventures)());

      var dog = this.countDog();
      var distend = this.countDistend();

      var transponder = external_kolmafia_namespaceObject.Item.get("transporter transponder");
      var transponderEffect = (0,external_kolmafia_namespaceObject.effectModifier)(transponder, "Effect");
      var effectTurns = () => (0,external_kolmafia_namespaceObject.haveEffect)(transponderEffect);
      var transpondersToUse = Math.max(0, Math.ceil((maps - effectTurns()) / 30));

      var totalIdeal = 0;
      var distendMissing = 0;
      var dogMissing = 0;

      var compute = (maps) => {
        totalIdeal = (maps + dog + distend) / 2;
        distendMissing = Math.ceil(Math.max(totalIdeal - distend, 0));
        dogMissing = maps - distendMissing;

        (0,external_kolmafia_namespaceObject.print)("Plan: We will be using ".concat(
          maps, " maps, using ").concat(transpondersToUse, " transponder").concat(transpondersToUse != 1 ? "s" : "", ". We will acquire ").concat(distendMissing, " ").concat(this.distendPill.name, ", and ").concat(dogMissing, " ").concat(this.dogHairPill.plural, ". You will have ").concat(distend + distendMissing, " ").concat(this.distendPill.plural, ", ").concat(dog + dogMissing, " ").concat(this.dogHairPill.plural, " at the end of this."),
        "blue"
        );
      };

      compute(maps);

      if (transpondersToUse > 0) {
        (0,external_kolmafia_namespaceObject.use)(transpondersToUse, transponder);

        var turns = effectTurns();

        if (turns < maps) {
          (0,external_kolmafia_namespaceObject.print)("Uh oh! Failed to ensure transponder effect, expected to use ".concat(
            transpondersToUse, " transponders for ").concat(transpondersToUse * 30 + turns % 30, " total turns, but have only ").concat(turns, " turns."),
          "red"
          );

          if (turns > 0) {
            (0,external_kolmafia_namespaceObject.print)("Recalculating...", "blue");
            transpondersToUse = 0;
            compute(turns);
          } else {
            throw "Failed to ensure enough turns of " + transponderEffect.name;
          }
        }
      }

      var toRun =



      [
      {
        count: distendMissing,
        choiceOption: "1",
        choiceName: "Follow Captain Smirk"
      },
      {
        count: dogMissing,
        choiceOption: "2",
        choiceName: "Follow the Green Girl"
      }];


      var initialChoices = [
      "Down the Hatch!",
      "Have a Drink",
      "Try That One Door"];


      for (var _i = 0, _toRun = toRun; _i < _toRun.length; _i++) {var run = _toRun[_i];
        if (run.count <= 0) {
          continue;
        }

        var choicesToPick = [].concat(initialChoices, [run.choiceName]);

        if (!this.runChoicesOurselves) {
          (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure536", run.choiceOption);
        }

        for (var i = 0; i < run.count; i++) {
          if (this.runChoicesOurselves) {
            (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?whichitem=".concat(
              this.mapGrimace.id, "&pwd=").concat((0,external_kolmafia_namespaceObject.myHash)()),
            false,
            true
            );
          } else {
            (0,external_kolmafia_namespaceObject.use)(1, this.mapGrimace);
          }

          // Fallback when mafia fails (eg, http errored)
          if ((0,external_kolmafia_namespaceObject.handlingChoice)()) {
            this.runChoicesManually(choicesToPick);
          }
        }
      }

      (0,external_kolmafia_namespaceObject.print)("Done! You now have ".concat(
        this.countDistend(), " ").concat(this.distendPill.plural, ", ").concat(this.countDog(), " ").concat(this.dogHairPill.plural),
      "blue"
      );

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.mapGrimace) > 0) {
        (0,external_kolmafia_namespaceObject.print)("You have ".concat(
          (0,external_kolmafia_namespaceObject.availableAmount)(this.mapGrimace), " grimace maps left"),
        "gray"
        );
      }
    } }, { key: "sanitizeKey", value:

    function sanitizeKey(key) {
      return key.
      toLowerCase().
      replaceAll(/[^a-zA-Z ]/g, "").
      replaceAll(/ {2}/g, " ").
      trim();
    } }, { key: "runChoicesManually", value:

    function runChoicesManually(prioritized) {
      // Ensure that minor differences in how kol does stuff doesn't throw this script off
      prioritized = prioritized.map((s) => this.sanitizeKey(s));

      for (var i = 0; i < 10 && (0,external_kolmafia_namespaceObject.handlingChoice)(); i++) {
        var choices = (0,external_kolmafia_namespaceObject.availableChoiceOptions)();
        var optionToSelect = void 0;

        for (var _i2 = 0, _Object$keys = Object.keys(choices); _i2 < _Object$keys.length; _i2++) {var key = _Object$keys[_i2];
          var optionDesc = choices[key];

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

        (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=".concat(
          (0,external_kolmafia_namespaceObject.lastChoice)(), "&option=").concat(optionToSelect, "&pwd=").concat((0,external_kolmafia_namespaceObject.myHash)())
        );
      }
    } }]);}();


function main() {var providedArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "info";
  var grimace = new Grimace();

  var args = providedArgs.split(" ").filter((s) => s.trim().length > 0);
  var goals = [];
  var unhandled = [];var _iterator = _createForOfIteratorHelper(

      args),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var arg = _step.value;
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
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  if (goals.length == 0) {
    goals.push("info");
  }

  if (unhandled.length > 0) {
    (0,external_kolmafia_namespaceObject.print)("Invalid arguments provided: ".concat(unhandled.join(", ")), "red");

    (0,external_kolmafia_namespaceObject.print)("Provide 'maps' to turn your maps into pills, or no args (or 'info') to view information about grimace map farming. Provide  Provide 'pref' to quietly save a pref of the next 10 days chances of encountering an alien. Provide a number to offset the calculations by that many days, eg '6'. Provide 'override' to skip the 'only if overdrunk' check.",

    "red"
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
var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;