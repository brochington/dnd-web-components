import Staction from 'staction';
import { Actions } from './actions';

export interface State {
  stuff: string;
}

const sharedStateMap = new Map<string, Staction<State, Actions>>();

export default sharedStateMap;

