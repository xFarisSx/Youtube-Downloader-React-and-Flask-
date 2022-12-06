

function History({list, downloadAgain, clearHistory}) {
	
	return (
		<div className="search-history">
			<h4>History
			<button onClick={clearHistory}>Clear the history</button>	
			</h4>
			<ul>
				{list.map(item => (
					<li onClick={e => downloadAgain(item.url)}>
						{item.title}
					</li>
				))}
			</ul>
		</div>
	)
}

export default History