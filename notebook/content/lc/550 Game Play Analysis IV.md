---
title: 550 Game Play Analysis IV
date: 2025-04-15
d: M
t: 
mastered: false
note: date_sub, 占比题，每个 gb 只要一个最小值
tags:
  - SQL50
---
```sql
SELECT round(

    count(distinct player_id) / (SELECT count(distinct player_id) FROM Activity)

    , 2) as fraction

FROM Activity

WHERE (player_id, date_sub(event_date, interval 1 day))
-- (player_id, 比event_date早一天的日期) 在 in表中
    in (

        SELECT player_id, min(event_date) FROM Activity

        group by player_id

    )
```