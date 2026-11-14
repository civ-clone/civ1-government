# civ1-government

Contains `Rule` to control the `Government`s available, provides `PlayerAction`s to have a revolution and handles some
effects when that happens. Aims to be in line with Civ 1.

Its revolution is `base-government-change`'s, under the save key `civ1-government:revolution` (`lib/revolution`). The
`civ1-government:player/revolution-terms` rule (`RevolutionTerms`) names that key and Anarchy, so code outside this
package, such as a computer player, can start and finish its revolutions through `base-government-change` without
importing it.
