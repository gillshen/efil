<script lang="ts">
	// import { GlobalState, preventDefault } from '$lib';
	import { Button } from '$lib/components/ui/button/index';

	import type { CommonAppActivity } from '$lib/types';
	import { getFilePath, openFile } from '$lib/utils/fs';
	import CommonAppActivityCard from '$lib/widgets/CommonAppActivityCard.svelte';

	let filePath = $state('');
	let activities: CommonAppActivity[] = $state([]);

	const handleOpenFile = async () => {
		filePath = await getFilePath();
		activities = (await openFile(filePath)) ?? [];
	};

	// const gs = new GlobalState();
	// const onsubmit = preventDefault(() => gs.nlen && gs.submit());
	// const onclick = () => gs.reset();
</script>

<div class="min-h-screen flex flex-col gap-8 p-4">
	<div class="flex items-center gap-4">
		<Button onclick={handleOpenFile}>Open File</Button>
		<small class="text-sm">{filePath}</small>
	</div>

	<div class="flex flex-col gap-4 w-fit">
		{#each activities as activity}
			<CommonAppActivityCard {activity} />
		{/each}
	</div>
</div>
