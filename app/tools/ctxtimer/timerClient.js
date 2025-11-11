"use client"
import { useState, useRef, useEffect } from "react";
import { timeString } from "@/lib/helpers"

/*
State consists of:
user hits Start to start contraction. Then we are "in" a contraction.
-The start button turns to a Stop button,
-a slider appears below to rate the intensity 1-10.
-a timer appears to time how long the current contraction lasts.

User hits stop, we are "out" of a contraction.
The list of previous contractions populates. Each item:
-the time it started
-the duration
-The intensity

Alternating between each contraction in the list is an interval:
-The time since the start of the last contraction (cadence)
-(smaller font) the "rest time," or the time BETWEEN contractions
*/

export default function ContractionTimer() {
    const [currentContraction, setCurrentContraction] = useState(null);
    const [contractionHistory, setContractionHistory] = useState([]);

    function handleStartStop({ startTime = null, duration = null, intensity = null }) {
        if (currentContraction) {
            const newCtxHist = [...contractionHistory];
            newCtxHist.push({
                startTime: currentContraction.startTime,
                duration: duration,
                intensity: intensity
            });
            setCurrentContraction(null);
            setContractionHistory(newCtxHist);
        } else {
            setCurrentContraction({ startTime: startTime });
        }
    }

    return (
        <div id='ctx-timer-container' className='flex justify-center items-center flex-col'>
            <StartStopContainer inContraction={currentContraction} handleStartStop={handleStartStop} />
            <ContractionList ctxList={contractionHistory} />
        </div>
    );
}

function StartStopContainer({ inContraction, handleStartStop }) {
    let startStopContent;
    if (inContraction) {
        startStopContent = <NewContractionUI handleStopCtx={handleStartStop} />;
    } else {
        startStopContent =
            <StartStopButton
                bgColorStr='bg-green-700'
                onClickHandler={() => handleStartStop({
                    startTime: new Date()
                })}
            >
                START
            </StartStopButton >;
    }
    return (
        <div id='start-stop-container'>
            {startStopContent}
        </div>
    );
}

function NewContractionUI({ handleStopCtx }) {
    const [duration, setDuration] = useState(new Date(0));
    const intensityName = "intensity";
    const intensitySlider = useRef(null);
    const intensityMin = 1;
    const intensityMax = 10;

    function onTimerTick(elapsed) {
        setDuration(elapsed);
    }

    return (
        <div className='flex items-center flex-col border-1'>
            <StartStopButton
                bgColorStr='bg-red-700'
                onClickHandler={() => handleStopCtx({
                    duration: duration,
                    intensity: intensitySlider.current.value
                })}
            >
                STOP
            </StartStopButton>
            <Timer onTimerTick={onTimerTick} />
            <label>Intensity</label>
            <input
                type="range"
                ref={intensitySlider}
                id={intensityName}
                name={intensityName}
                min={intensityMin}
                max={intensityMax}
            />
        </div>
    ); // we are ending the contraction, no need to pass a start time.
}

function StartStopButton({ bgColorStr, onClickHandler, children }) {
    return (
        <button
            className={
                `${bgColorStr}
                w-20
                aspect-square
                rounded-full
                flex
                items-center
                justify-center
                font-bold`
            }
            onClick={onClickHandler}
        >
            {children}
        </button>
    );
}

// timer that automaticaly starts from zero on render and can return its value in (?)ms
export function Timer({ onTimerTick }) {
    // get the current time and set the timer to 0
    const [startTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState(new Date(0));

    useEffect(() => {
        // Set up an interval to update the time every second
        const intervalId = setInterval(() => {
            let now = new Date();
            let elapsed = new Date(now - startTime);
            setElapsedTime(elapsed);
            onTimerTick(elapsed);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    return (
        <div>
            <span>Elapsed Time: </span>
            <span>{timeString(elapsedTime)}</span>
        </div>
    );
}

function ContractionList({ ctxList }) {
    let interval = null;
    return (
        <ul className='w-60'>
            {ctxList.map((ctx, i, ctxHist) => {
                if (i > 0) {
                    const prevCtx = ctxHist[i - 1];
                    let cadence = new Date(ctx.startTime - prevCtx.startTime);
                    let rest = new Date(cadence - prevCtx.duration);
                    interval = (
                        <div className='bg-green-300 p-1 rounded-lg text-black'>
                            <h3>Interval</h3>
                            <p>Contraction Cadence: {timeString(cadence)}</p>
                            <p>Rest Time: {timeString(rest)}</p>
                        </div>
                    );
                }

                return (
                    <li key={i}>
                        {interval}
                        <div className='bg-sky-900 p-1 rounded-lg'>
                            <h3>Contraction</h3>
                            <p>Start Time: {ctx.startTime.toLocaleTimeString()}</p>
                            <p>Duration: {timeString(ctx.duration)}</p>
                            <p>Intensity: {ctx.intensity}</p>
                        </div>
                    </li>
                );
            })}
        </ul >
    );
}