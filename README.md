# Pre-work - *Memory Game*

Simon Game by Simon is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Simon Lequar

Time spent: 4 hours spent in total

Link to project: https://guiltless-luxuriant-porpoise.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

 * There is a toggleable difficulty setting, which changes the speed and length of the pattern (which I'm counting as playback speeds up)
 * The audio actually works in Safari, and won't break when the game ends 
 * Timings slightly adjusted so that the game doesn't cut off the last sound 
 * You can use the keyboard buttons 1-4 to play the game. 
 * Buttons disabled while the computer is playing the pattern, so you can't interrupt it. 
 * Customized victory message to the difficulty played

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](https://i.imgur.com/ffREvN1.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

StackExchange, and a website cited in my comments. Mostly just googling to remember javascript syntax. I'm quite rusty at the moment. 


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

Deciding how to organize the buttons and their handlers. Originally, all the handlers were in the HTML file, but then I realized you couldn't turn on and off the buttons while the computer was playing the code. Actually, I realized that you could mess with the computer first, and then I had to plan how to solve that problem. The first thing that I considered was a static set of background buttons that would replace the foreground ones that the player can click, but then I realized that those wouldn't light up as the computer played the code. I then realized the button funcitonality had to turn on and off, so I had to create functions to do that. Regular HTML can't check state (as far as I can tell) to turn on or off a click handler, so it was put into the Javascript intead. 

There were also a few smaller bugs having to do with the timing of turning this funciton on and off, but that was mostly a question of testing and seeing when things fired unexpectedly. 

This was also a challenge when implementing the keypress option instead, because there is no "onkeypress" for a button item, so I had to run those using the lit/unlit functions we had defined for the computer previously. I also had to double check the timings there so that the guesses wouldn't get cut off unexpectedly. This wasn't that bad because we had previously implemented the funcitons needed to make keypresses work just as well as clicking the buttons. 


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

Is all web development this hacky? I sure don't hope the internet runs on code as bad (or rather, poorly and quickly constructed) as this is. I suppose this game works decently enough, and doesn't have significant problems, but it can and should be improved for public consumption. 

Also, how do large groups work on CSS related projects. This seems like way more of a nightmare than header files or API specifications. It could just be that I'm not terribly familiar with CSS yet, but the cascading style seems like it'll cause a lot of potential issues. 


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

More difficulty settings. Having a few more customizable modes would also be good (ie neverending). Tracking the number you've gotten right so far (basically displaying progress and guessCounter). Adding customizable numbers of buttons as well. Making the notes played into the introduciton of Rick Astley's famous hit "Never Gonna Give You Up". There's a lot of directions you could go with this one. 

In terms of cleanliness, having the CSS flow better. I'm not sure if you can just create a list of colors for the buttons and have them access it, but figuring out how that works would be great so that you didn't have to have style rules for each individual button. Coming off of a lot of functional programming where you can just map functions onto lists, the CSS seemed quite painful

For cleanliness in the javascript, ordering and grouping functions better. I wish that Glitch would remember which functions were collapsed when you reloaded the page, but if I had better organization in the first place, it wouldn't have been so bad when I had to find things

Also, resolving exactly what was going on in the audio. The hacky fix I added works, but I don't really understand why. I'm assuming this issue is a real pain though. 



## License

    Copyright Simon Lequar

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.