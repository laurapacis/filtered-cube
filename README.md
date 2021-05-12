## [filtered-cube.vercel.app](https://filtered-cube.vercel.app/)

## About

The project is a small web app that accepts an uploaded image from the user and creates a tridimensional cube whose faces are the uploaded image with different filters applied. There is also a button that manages the state of the image, sending it to the store of the application (Redux).

## Stack

Built with React.js and styled in CSS.
The cube and the [filters](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) were developed using the CanvasAPI.
Redux for the state management of the application.
Deployed with Vercel.

## Development time

approx. 2 days of work.

## My approach:

#### Design

For the showcase of the images I first implemented a carousel-like element, using the library [Swiper.js](https://swiperjs.com/), which is special for this feature. The code looked like this:

```
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';

// import Swiper core and required modules
import SwiperCore, {
  EffectCoverflow
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([EffectCoverflow]);

const Carousel = () => {
    return (
        <>
            <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                'rotate': 20,
                'stretch': 0,
                'depth': 200,
                'modifier': 1,
                'slideShadows': true
            }} className='swiper-container'>
                <SwiperSlide><img src='https://swiperjs.com/demos/images/nature-6.jpg' alt='' /></SwiperSlide>
                <SwiperSlide><img src='https://swiperjs.com/demos/images/nature-7.jpg' alt='' /></SwiperSlide>
                <SwiperSlide><img src='https://swiperjs.com/demos/images/nature-8.jpg' alt='' /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Carousel;
```

Soon I started thinking of more creative ways of approaching the showcase of the images, and I ended up implementing a tridimensional cube instead. It was fun, but I am a bit worried it was a too risky approach in terms of project request and delivery.

For the rest of the design and style I decided to go 'low-key' almost as redemption for my lack of time.

#### State Management

My first approach (and desire) was building this project using a state machine. Previously I had never heard of this concept, but I found it attractive and at the same time familiar (due to my experience with Redux).

I read [interesting opinionated articles about Redux-reducer as a state machine](https://medium.com/unsplash/strongly-typed-finite-state-machines-with-redux-and-typescript-3aac2b0332f5) (which left me a bit perplexed at the beginning), and I found what became my [favorite stackoverflow thread so far](https://stackoverflow.com/questions/54482695/what-is-an-actual-difference-between-redux-and-a-state-machine-e-g-xstate). I also watched some [introduction tutorials](https://www.youtube.com/watch?v=iDZxjJYMOUQ&t=84s), that gave me the impression of state machines having more "simplicity" and "clarity" in their structure, comparing to Redux.

I spent almost a day of trial and error, but mostly of error, so I decided to change to Redux to be able to deliver on time.

Nevertheless, this is how my state machine with XState was starting to look like:

```
import { useMachine } from "@xstate/react";
import { Machine, assign } from "xstate";

const dataMachine = Machine({
      id: "app",
      strict: true,
      initial: "idle",
      context: {
        data: []
      },
      states: {
        idle: {
          on: { SUBMIT: "processing" }
        },
        processing: {
          invoke: {"processFile" },
          on: {
            PROGRESS: { actions: "updateProgress" },
            ERROR: { target: "error", actions: "storeError" },
            DONE: { target: "completed", actions: "storeFileData" }
          }
        },
        error: {
          entry: "showError",
        },
        completed: {
          entry: "renderImageFile",
          after: { 5000: "idle" }
        }
      },
      on: {
        BROWSE: { actions: "browseForFile" },
        PICK_FILE: { target: "processing", actions: "storeFile" }
      }
    },
    {
      guards: {
        hasError: ctx => !!ctx.error
      },
      actions: {
        resetProgress: assign({ progress: 0, error: null }),
        updateProgress: assign({ progress: (_, { value }) => value }),
        storeFile: assign({ files: (_, { files }) => files }),
        storeFileData: assign({ fileData: (_, { data }) => data }),
        storeError: assign({ error: (_, { data }) => data })
      }
    }
  );
```

#### Redux implementation

This was the most challenging part of the project (as usual). Specially problematic was dispatching the action to the store, since at the beginning I was working with just one `input` for two functions (`handleImage` and `handleSubmit`). Adding an extra Submit button was the solution for it, although from a user experience point of view was not the best option.

The following preview shows the state and the triggered action on the browser redux-devtools, it works!:

<img src="https://media.giphy.com/media/UL7OiJSGyJGM9g2rqg/giphy.gif" width="500">

## Improvements

With a longer deadline I would have:

- kept learning and understanding State Machines (with XState) and built the web app with this tool instead of Redux.
- implemented p5.js visual effects or at least the 5p.js `filter()` method for the filters of the images.
- added the Download Button and `react-file-base64` for file manipulation.
- created a better layout, design and style overall.

## Final thoughts

On one hand, I wish I would have decided to use Redux from the beginning so I could have more time to implement `react-file-base64` and the Download button, but on the other hand, I am glad I could spend some time expanding my knowledge about state machines.

With this project, I learned not only about new topics but also about the importance of prioritizing and making decisions.
