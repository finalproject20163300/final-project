import React, { useEffect, useState } from 'react';

// toLocaleDateString 날짜
// toLocaleString 날짜 + 시간
// toLocaleTimeString 시간
// 현재시간 표시
function TimeNow() {
	let [now, setNow] = useState(new Date());
	useEffect(() => {
    setInterval(() => {
			setNow(new Date());
    }, 1);
  }, [])
	return (
		<>
		{now.toLocaleTimeString()}
		</>
	)
}

export { TimeNow };