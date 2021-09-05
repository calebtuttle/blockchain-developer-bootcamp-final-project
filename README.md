# ConsenSys Blockchain Developer Bootcamp Final Project

## Project Idea: A Decentralized Job Board
Tentatively, my final project will be a decentralized job board. 
It will allow users to post to the job board and apply to jobs. 

### Posting a Job
Each job posting will have the following properties:

- title
- description
- profile of posting organization (this property might not be necessary)
- applicants
- duration of posting

The applicants property is a list of addresses which have applied (see the next section for more).
The duration of posting is either a time duration or a number of blocks after which the posting will be eliminated from the board.

It is conceivable that bad actors might spam the job board. 
To mitigate spam, the job board will require each job poster to lock some eth in the contract for the duration of the posting.
Once the job is eliminated from the board, all eth the poster used to secure the job posting will be returned to the poster.
This spam mitigation tactic needs refining, and other measures are probably needed. This tactic is simply a first pass at the problem.

### Applying to a Job
Each applicant must have a profile which has the following properties:
- Name (can be pseudonym)
- Links to relevant materials (e.g., LinkedIn profile)

Applying to a job involves adding this information to the applicants list in the job post construct.

Mitigating spam here is left to the job posters.

### The Rest of the Hiring Process
Everything else in the hiring process (e.g., communication about interviews) is handled off chain.
