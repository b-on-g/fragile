namespace $.$$ {

	const preview = {
		flex: {
			grow: 1,
			basis: '12rem',
		},
		Content: {
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
		},
	} as const

	$mol_style_define( $bog_fragile_demo_case, {
		Compare: {
			gap: $mol_gap.block,
		},
		Before: preview,
		After: preview,
	} )

}
