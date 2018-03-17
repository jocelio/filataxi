/**
 * Created by jocelio on 22/02/18.
 */

export const DATA_AVAILABLE = 'DATA_AVAILABLE';

import Data from '../instructions.json';

export const getData = () => ({type: DATA_AVAILABLE, data:Data.instructions})