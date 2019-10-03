import { firebaseDatabase } from '../utils/firebase';

export default class FirebaseService {
  static getDataList = (nodePath, callback, size = 10) => {
    let query = firebaseDatabase.ref(nodePath).limitToLast(size);
    query.on('value', dataSnapshot => {
      console.log(dataSnapshot.val());
      let items = [];
      // dataSnapshot.forEach(childSnapshot => {
      //   let item = childSnapshot.val();
      //   item['key'] = childSnapshot.key;
      //   items.push(item);
      // });
      callback(items);
    });

    return query;
  };

  static set = (nodePath, object) => {
    firebaseDatabase.ref(nodePath).set(object);
  };
}
