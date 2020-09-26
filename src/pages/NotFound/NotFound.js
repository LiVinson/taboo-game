import React from 'react'
import { ButtonErrorCard } from 'components/shared/ErrorCard'

const NotFound = () => {
	const errorMsg = "Uh-oh, I don't think this is where you should be. Try going home and starting again. "
	return <ButtonErrorCard title="Lost?" error={errorMsg} />
}

export default NotFound
