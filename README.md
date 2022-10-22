# Streaming Service Prototype

## Get Started

This project is built using [Next.js](https://nextjs.org) and [Chakra UI](https://chakra-ui.com/) because I thought it would be fun to spend more time with these frameworks and familiarize myself with their usage.

### To view this project online

https://streaming-service-prototype.vercel.app/series/tt0106179/5

### To run this repo locally:

1. Go to https://omdbapi.com and get an API key.
1. Rename `.env.local.example` -> `.env.local` and add your API key to this file
1. `npm install`.
1. `npm run dev` to run in Dev mode, or `npm run build && npm start` to run in Production mode.

## Notes

- The design comp provided is fairly simple in that it does not account for different app states. I took some liberties with the functionality and design in order to account for this, especially at the small table and mobile level.
- In addition, rather than use the exact pixel values provided in the design comp I opted to use Chakra's fontSize presets and chose the variables that most closely matched the font styles or spacing at the provided viewport size.
- I quickly discovered that the OMDB API is not very robust in the data that it provides. For example, for most TV shows I tried to input, there were only a handful of Episodes available for each Season.
- To create the initial data payload I'm doing a ton of API calls. This would not be reasonable in an actual app with hundreds of shows, but the good news is that Next.js is running these API calls during the build process so it wouldn't affect the client even if it were built this way (probably just cause innumerable headaches for the devs). Also, because of the quick turnaround for the assignment, I've left out error handling and error states for these API calls. This is something that would absolutely need to be accounted for in a production app.
- The Episodes Slider is very very basic. There's no touch events, no a11y support, and the logic is not amazing. I just wanted to show a quick-and-dirty example of how it might animate. There's also no debouncing happening on the window resize event for recalculating the slideshow, which is not ideal.
