"use client"
import { useState, useRef, useEffect, memo, useCallback } from "react";
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

    const handleStartStop = useCallback(({ startTime = null, duration = null, intensity = null }) => {
        if (currentContraction) {
            // Pre-calculate interval data when adding a new contraction
            const newContraction = {
                id: Date.now(), // Unique ID for React key
                startTime: currentContraction.startTime,
                duration: duration,
                intensity: intensity,
                cadence: null,
                rest: null
            };

            // Calculate cadence and rest if there's a previous contraction
            if (contractionHistory.length > 0) {
                const prevCtx = contractionHistory[contractionHistory.length - 1];
                newContraction.cadence = new Date(newContraction.startTime - prevCtx.startTime);
                newContraction.rest = new Date(newContraction.cadence - prevCtx.duration);
            }

            setContractionHistory([...contractionHistory, newContraction]);
            setCurrentContraction(null);
        } else {
            setCurrentContraction({ startTime: startTime });
        }
    }, [currentContraction, contractionHistory]);

    return (
        <div id='ctx-timer-container' className='flex justify-center items-center flex-col'>
            <StartStopContainer inContraction={currentContraction} handleStartStop={handleStartStop} />
            <ContractionList ctxList={contractionHistory} />
        </div>
    );
}

const StartStopContainer = memo(function StartStopContainer({ inContraction, handleStartStop }) {
    let startStopContent;
    if (inContraction) {
        startStopContent = <NewContractionUI handleStopCtx={handleStartStop} startTime={inContraction.startTime} />;
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
});

const NewContractionUI = memo(function NewContractionUI({ handleStopCtx, startTime }) {
    const intensityName = "intensity";
    const intensitySlider = useRef(null);
    const intensityMin = 1;
    const intensityMax = 10;

    return (
        <div className='flex items-center flex-col border-1'>
            <StartStopButton
                bgColorStr='bg-red-700'
                onClickHandler={() => {
                    const duration = new Date(Date.now() - startTime.getTime());
                    handleStopCtx({
                        duration: duration,
                        intensity: intensitySlider.current.value
                    });
                }}
            >
                STOP
            </StartStopButton>
            <Timer startTime={startTime} />
            <label>Intensity</label>
            <input
                type="range"
                ref={intensitySlider}
                id={intensityName}
                name={intensityName}
                min={intensityMin}
                max={intensityMax}
                defaultValue={intensityMin}
            />
        </div>
    );
});

const StartStopButton = memo(function StartStopButton({ bgColorStr, onClickHandler, children }) {
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
});

// timer that automaticaly starts from zero on render and can return its value in (?)ms
export function Timer({ startTime }) {
    const [elapsedTime, setElapsedTime] = useState(new Date(0));

    useEffect(() => {
        // Set up an interval to update the time every second
        const intervalId = setInterval(() => {
            let now = new Date();
            let elapsed = new Date(now - startTime);
            setElapsedTime(elapsed);
            console.log('⏱️  Timer updated:', timeString(elapsed));
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [startTime]);

    return (
        <div>
            <span>Elapsed Time: </span>
            <span>{timeString(elapsedTime)}</span>
        </div>
    );
}

const ContractionList = memo(function ContractionList({ ctxList }) {
    // Performance tracking: Log renders to console
    useEffect(() => {
        console.log('🔄 ContractionList rendered. Items:', ctxList.length);
    });

    return (
        <ul className='w-60'>
            {ctxList.map((ctx) => (
                <li key={ctx.id}>
                    {ctx.cadence && (
                        <div className='bg-green-300 p-1 rounded-lg text-black'>
                            <h3>Interval</h3>
                            <p>Contraction Cadence: {timeString(ctx.cadence)}</p>
                            <p>Rest Time: {timeString(ctx.rest)}</p>
                        </div>
                    )}
                    <div className='bg-sky-900 p-1 rounded-lg'>
                        <h3>Contraction</h3>
                        <p>Start Time: {ctx.startTime.toLocaleTimeString()}</p>
                        <p>Duration: {timeString(ctx.duration)}</p>
                        <p>Intensity: {ctx.intensity}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
});