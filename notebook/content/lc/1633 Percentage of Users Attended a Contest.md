---
title: 1633 Percentage of Users Attended a Contest
date: 2025-04-15
d: E
t: 
mastered: false
note: count 作为被除数怎么用
tags:
  - SQL50
---
select contest_id,

round(count(distinct user_id)/(select count(user_id) from Users),2) as percentage

from Register r

group by contest_id

order by percentage desc, contest_id asc