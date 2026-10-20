#!/usr/bin/env bash
cd "$(dirname "$0")/../.."
cases="outer/page rename/tree rename/ts retype/child collide/child collide/named spread/plain spread/keep"

echo '# build'
for case in $cases
do
	printf '%-14s ' $case
	out=$( npx mam bog/fragile/$case 2>&1 )
	echo "$out" | grep -o -m1 -E 'error TS[0-9]+: [^\\]*' \
		|| echo "$out" | grep -o -m1 -E 'Equality assertion failure' \
		|| echo ok
done

echo '# rendered'
node -e '
	const text = x => typeof x === "object" ? x.sub().join( "" ) : x
	for( const path of process.argv.slice( 1 ) ) {
		const $ = require( `./bog/fragile/${ path }/-/node.js` )
		const view = $[ "$bog_fragile_" + path.replace( "/" , "_" ) ].make( {} )
		console.log( path.padEnd( 14 ) , view.sub().map( text ) )
	}
' $cases
