import { firebaseDatabase } from '../utils/firebase';

export default class FirebaseService {
  static set = (nodePath, object) => {
    firebaseDatabase.ref(nodePath).set(object);
  };

  static ref = nodePath => {
    return firebaseDatabase.ref(nodePath);
  };
}
