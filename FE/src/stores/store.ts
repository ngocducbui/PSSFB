import { writable } from 'svelte/store';
export const currentUser:any = writable();
export const pageStatus:any = writable("done");
currentUser.subscribe((value:any) => {
	//console.log("currentUser", value);
}); // logs '0'

// currentUser.subscribe((value:any) => {
// 	currentUserValue =  value
// })
// export let currentUserValue = undefined
