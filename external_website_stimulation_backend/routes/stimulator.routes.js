import express from 'express'
import {courseraStimulation}from '../controllers/stimulator.controllers.js'

const stimulatorRouter = express.Router();

stimulatorRouter.post('/stimulate/coursera',courseraStimulation)
export default stimulatorRouter;