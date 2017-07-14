export function removeExtraChar (res)  {
	return JSON.stringify(res.message.slice(15,res.message.length));

}

