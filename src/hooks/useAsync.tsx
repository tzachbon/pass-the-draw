import { useCallback, useState } from 'react'

export function useAsync() {
	const [ loading, setLoading ] = useState(false)
	const [ error, setError ] = useState<Error | undefined>()

	const run = useCallback(
		function <T = unknown, P extends Array<unknown> = unknown[]>
		(
			callback: (...args: P) => Promise<T> | T,
		) {
			 return async (...args: P) => {
				setLoading(true)
				try {
					await callback(...args)
				} catch (error) {
					setError(error)
				} finally {
					setLoading(false)
				}
			}
		},
		[],
	)

	return {
		run,
		loading,
		error,
		setLoading,
		setError,
	}
}
