import { db, isFirebaseEnabled } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

export { isFirebaseEnabled };

export async function seedInitialData(isCancelled, initialProjects, initialTeam) {
  try {
    const projectsRef = collection(db, 'projects');
    const projectsSnap = await getDocs(projectsRef);
    if (projectsSnap.empty && !isCancelled) {
      console.log('Firebase Database: Seeding default projects...');
      for (const proj of initialProjects) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }
    }

    const teamRef = collection(db, 'team');
    const teamSnap = await getDocs(teamRef);
    if (teamSnap.empty && !isCancelled) {
      console.log('Firebase Database: Seeding default team structure...');
      for (const member of initialTeam) {
        await setDoc(doc(db, 'team', member.id), member);
      }
    }
  } catch (error) {
    console.error('Firebase initialization seeding error:', error);
  }
}

export function subscribeToProjects(callback) {
  return onSnapshot(collection(db, 'projects'), (snapshot) => {
    const projs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.image && data.image.endsWith('.jpg') && data.image.includes('/assets/projects/')) {
        data.image = data.image.replace('.jpg', '.webp');
      }
      projs.push({ id: doc.id, ...data });
    });
    callback(projs);
  });
}

export function subscribeToTeam(callback) {
  return onSnapshot(collection(db, 'team'), (snapshot) => {
    const members = [];
    snapshot.forEach((doc) => {
      members.push({ id: doc.id, ...doc.data() });
    });
    callback(members);
  });
}

export function subscribeToMessages(callback) {
  return onSnapshot(collection(db, 'messages'), (snapshot) => {
    const msgs = [];
    snapshot.forEach((doc) => {
      msgs.push({ id: doc.id, ...doc.data() });
    });
    msgs.sort((a, b) => new Date(b.date) - new Date(a.date));
    callback(msgs);
  });
}

export async function addProject(id, data) {
  await setDoc(doc(db, 'projects', id), data);
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, 'projects', id));
}

export async function addTeamMember(id, data) {
  await setDoc(doc(db, 'team', id), data);
}

export async function deleteTeamMember(id) {
  await deleteDoc(doc(db, 'team', id));
}

export async function addMessage(id, data) {
  await setDoc(doc(db, 'messages', id), data);
}

export async function deleteMessage(id) {
  await deleteDoc(doc(db, 'messages', id));
}

export async function markMessageRead(id, data) {
  await setDoc(doc(db, 'messages', id), data);
}

export async function resetDatabase(initialProjects, initialTeam) {
  const projectsRef = collection(db, 'projects');
  const projectsSnap = await getDocs(projectsRef);
  for (const docItem of projectsSnap.docs) {
    await deleteDoc(doc(db, 'projects', docItem.id));
  }
  for (const proj of initialProjects) {
    await setDoc(doc(db, 'projects', proj.id), proj);
  }

  const teamRef = collection(db, 'team');
  const teamSnap = await getDocs(teamRef);
  for (const docItem of teamSnap.docs) {
    await deleteDoc(doc(db, 'team', docItem.id));
  }
  for (const member of initialTeam) {
    await setDoc(doc(db, 'team', member.id), member);
  }

  const messagesRef = collection(db, 'messages');
  const messagesSnap = await getDocs(messagesRef);
  for (const docItem of messagesSnap.docs) {
    await deleteDoc(doc(db, 'messages', docItem.id));
  }
}
