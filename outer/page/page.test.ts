namespace $ {
	$mol_test({

		"owner sets inner property of widget"() {
			const page = $bog_fragile_outer_page.make({})
			$mol_assert_equal( page.Weather().sub(), [ "Питер" ] )
		},

	})
}
