# Design Pattern Decisions

For this project, I focused on using two design patterns: **inheritance** and **access control**. My decisions are documented below.

My JobBoard.sol contract inherited from the Owner contract from OpenZeppelin. I use the onlyOwner modifier to restrict access to the function removeAllJobs(). Although this design significantly reduces the potential "permissionlessness" of the contract, it allows the job board owner to periodically clear the job board. This can be useful in case of a spam attack or if job posters simply don't take down their jobs even after finding a suitable candidate.