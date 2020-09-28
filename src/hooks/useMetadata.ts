import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export const useMetadata = (
	attribute: string,
	listen: boolean = false
): firebase.firestore.DocumentData | undefined => {
	const { Firestore } = React.useContext(FirebaseContext)
	const [data, setData] = React.useState<firebase.firestore.DocumentData>()
	const ref = Firestore.collection("metadata").doc(attribute)

	React.useEffect(() => {
		listen
			? ref.onSnapshot(snap => setData(snap.data()))
			: ref.get().then(doc => doc.exists && setData(doc.data()))
	}, [ref, listen])

	return data
}
