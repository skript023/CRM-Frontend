<script lang="ts">
  	import { onMount } from "svelte";
	import Navigation from "./layout/Navigation.svelte";

	import {
		Datatable,
		initTE,
	} from "tw-elements";

	onMount(() => {
		initTE({ Datatable });
	})

	const data = {
  columns: [
    {
      label: 'Name',
      field: 'name'
    },
    'Position',
    'Office',
    'Age',
    'Start date',
    'Salary',
  ],
  rows: [
    ["Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800"],
    ["Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750"],
    ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000"],
    ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "2012/03/29", "$433,060"],
    ["Airi Satou", "Accountant", "Tokyo", "33", "2008/11/28", "$162,700"],
    ["Brielle Williamson", "Integration Specialist", "New York", "61", "2012/12/02", "$372,000"],
    ["Herrod Chandler", "Sales Assistant", "San Francisco", "59", "2012/08/06", "$137,500"],
    ["Rhona Davidson", "Integration Specialist", "Tokyo", "55", "2010/10/14", "$327,900"],
    ["Colleen Hurst", "Javascript Developer", "San Francisco", "39", "2009/09/15", "$205,500"],
    ["Sonya Frost", "Software Engineer", "Edinburgh", "23", "2008/12/13", "$103,600"],
    ["Jena Gaines", "Office Manager", "London", "30", "2008/12/19", "$90,560"],
    ["Quinn Flynn", "Support Lead", "Edinburgh", "22", "2013/03/03", "$342,000"],
    ["Charde Marshall", "Regional Director", "San Francisco", "36", "2008/10/16", "$470,600"],
    ["Haley Kennedy", "Senior Marketing Designer", "London", "43", "2012/12/18", "$313,500"]
  ],
};

	onMount(() => {
		const datatable = document.getElementById('datatable')
		const instance = new Datatable(datatable, data)

		document.getElementById('datatable-search-input')?.addEventListener('input', (e) => {
			// @ts-ignore
			instance?.search(e.target.value);
		});

		datatable?.addEventListener('selectRows.te.datatable', (e) => 
		{
			// @ts-ignore
			console.log(e.selectedRows, e.selectedIndexes, e.allSelected);
		})
	})
</script>

<Navigation>
	<div class="mb-3">
		<div class="relative mb-4 flex w-full flex-wrap items-stretch">
		  <input
			id="datatable-search-input"
			type="search"
			class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
			placeholder="Search"
			aria-label="Search"
			aria-describedby="button-addon1" />
		</div>
	</div>
	<div id="datatable" data-te-selectable="true" data-te-multi="true"></div>
</Navigation>