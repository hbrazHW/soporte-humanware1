import React from 'react'
import { ProgressBar, Step } from "react-step-progress-bar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faIdBadge, faThumbsUp, faBriefcase, faSearch } from '@fortawesome/free-solid-svg-icons'

const MultiStepProgressBar = (props) => {
    var stepPercentage = 0;

    if (props.currentStep === 1) {
        stepPercentage = 0;
    } else if (props.currentStep === 2) {
        stepPercentage = 36;
    } else if (props.currentStep === 3) {
        stepPercentage = 67;
    }else if (props.currentStep === 3) {
        stepPercentage = 100;
    }else {
        stepPercentage = 0;
    }

    return (
        <ProgressBar percent={stepPercentage}>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {/* {index + 1} */}

                        <FontAwesomeIcon icon={faBriefcase} className="fs-6 upload-file atras" color="#eee" /> 
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                        {/* {index + 1} */}
                       <FontAwesomeIcon icon={faClipboardList} className="fs-6 upload-file atras" color="#eee" />
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                         <FontAwesomeIcon icon={faSearch} className="fs-6 upload-file atras" color="#eee" />
                    </div>
                )}
            </Step>
            <Step>
                {({ accomplished, index }) => (
                    <div
                        className={`indexedStep ${accomplished ? "accomplished" : null}`}
                    >
                         <FontAwesomeIcon icon={faThumbsUp} className="fs-6 upload-file atras" color="#eee" />
                    </div>
                )}
            </Step>
        </ProgressBar>
    )
}

export default MultiStepProgressBar
