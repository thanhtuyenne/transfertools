import { configureStore } from '@reduxjs/toolkit'
import clickTextSlice from './clickTextSlice'
import clickURLSlice from './clickURLSlice'
import clickImageSlice from './clickImageSlice'
import clickVideoSlice from './clickVideoSlice'
import clickRecordSlice from './clickRecordSlice'
import clickAudioSlice from './clickAudioSlice'
import typeModelSlice from './typeModelSlice'
import clickDeleteSlice from './clickDeletefile'
import clickDataIdTypeSlice from './clickDataIdType'
import clickSelectData from './clickSelectData'

export const store = configureStore({
  reducer: {
    clickText: clickTextSlice,
    clickUrl: clickURLSlice,
    clickImage: clickImageSlice,
    clickVideo: clickVideoSlice,
    clickRecord: clickRecordSlice,
    clickAudio: clickAudioSlice,
    typeModel: typeModelSlice,
    clickDelete: clickDeleteSlice,
    clickIdType: clickDataIdTypeSlice,
    clickSelect: clickSelectData,
  }
})