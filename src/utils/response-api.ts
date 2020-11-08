// Types
import {CodeResponseType} from '../types/app-type'

export default <D>(data: D, code: CodeResponseType, message: string) => ({code, data, message})
