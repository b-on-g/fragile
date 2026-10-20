namespace $ {
	$mol_test({

		"heir heading overrides base heading in view.tree"() {
			$mol_assert_equal( $bog_fragile_rename_tree.make({}).sub(), [ "Наследник" ] )
		},

	})
}
