This is a script intended for Kingdom of Loathing to provide information about grimace, and when to farm for maps.

This script does not farm maps.

There is another script, not made by me, that does farm maps. You can check it out, though I don't use it and have not tried it.

https://github.com/horrible-little-slime/garfo

## To install the script, use

```text
svn checkout https://github.com/libraryaddict/KolGrimace/branches/release/
```

To use this script, there are two parameters you can provide.

Command usage is

`grimace`

or

`grimace <Param>`

## Parameters

`info` - This is the default parameter, and does not need to be provided.

This will look at your pills and tell you if you need to go grimace map farming, if today is a good day, and when the next good days are.

Reminder, grimace map farming isn't always a good idea because it highly depends on the current moons of loathing. On certain days, only monsters that drop maps will spawn. On other days, aliens that drop trash will spawn.

This lets you know when a good day is.

`maps`

This will use as many transponders as appropiate and use your grimace maps to collect the distension pills, and dog pills. It will attempt to balance the distribution so you end up with an equal amount of both pills.

This is recommended to be run when overdrunk, and as such will currently fail to run when in headless mode. And will require confirmation to continue if not in headless mode.

If you're overdrunk, then it will not require confirmation.
This is because there's no advantages that I can think of, to be gained by using this when not overdrunk.

## Examples of output text

```text
> grimace

You should do some grimace farming soon, you will run out in 20 days and have only 3 chances before running out. The best days are after: 12, 13, 14, 27, 29, 30, 32, 46, 47 rollovers

> grimace

Grimace farming has 17 chances to farm before you run out. You have 101 pills/days left. The next alien free day is after 12 rollovers occurs
```