namespace $ {
	$mol_test({

		"heir heading overrides base heading in view.ts"() {
			$mol_assert_equal( $bog_fragile_rename_ts.make({}).sub(), [ "Наследник" ] )
		},

	})
}
