import React from "react"
import FirebaseContext from "../contexts/FirebaseContext"

export const useMetadata = (
	attribute: string
): firebase.firestore.DocumentData | undefined => {
	const { Firestore } = React.useContext(FirebaseContext)
	const [data, setData] = React.useState<firebase.firestore.DocumentData>()

	React.useEffect(() => {
		Firestore.collection("metadata")
			.doc(attribute)
			.get()
			.then(doc => doc.exists && setData(doc.data()))
	}, [Firestore, attribute])

	return data
}
