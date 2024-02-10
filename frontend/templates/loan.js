export const loanAgreementFormat = `
<p>
LOAN AGREEMENT BETWEEN
<br/><br/>
{lenderName}
<br/><br/>
AND {borrowerName}
<br/><br/>

THIS AGREEMENT made and entered into at {agreementState} on {agreementDate}, BETWEEN {lenderName} hereinafter called "the Lender" AND {borrowerName} hereinafter called "the Borrower" and reference to the parties hereto shall mean and include their respective heirs, executors, administrators and assigns;
<br/><br/>
WHEREAS the Borrower is in need of funds and hence has approached the Lender to grant her a loan of Rs.{loanAmount}/- for a period of {loanDuration} years at an interest rate of {rateOfInterest}%;
<br/><br/>
AND WHEREAS the Lender has agreed to grant a loan to the Borrower, free of interest, as the Lender and the Borrower have known each other since several years;
<br/><br/>
AND WHEREAS the parties hereto are desirous of recording the terms and conditions of this loan in writing;
<br/><br/>
NOW THIS AGREEMENT WITNESSETH and it is hereby agreed by and between the parties hereto as under:-
<br/><br/>
1. The Borrower here to, being in need of money, has requested the Lender to give her a loan of Rs.{loanAmount}/- to enable her to purchase a residential flat, to which the Lender has agreed.
<br/><br/>
2. The said loan is required by the Borrower for a period of {loanDuration} years at a rate of {rateOfInterest}, commencing from {loanStartDate} and terminating on {loanEndDate}.
<br/><br/>
3. The Borrower hereby agrees and undertakes to return the loan of Rs.{loanAmount}/-, in instalments, within the aforesaid period of {loanDuration} years and gives her personal guarantee for the same.
<br/><br/>
4. The terms and conditions of this Agreement are arrived at by the mutual consent of the parties hereto.
<br/><br/>

IN WITNESS WHEREOF the parties hereto have hereunto set and subscribed their respective hands the day and year first hereinabove written.
<br/><br/><br/>
Signed and delivered by the within named and in presence of {lenderName}
<br/><br/>
Signed and delivered by the within named and in presence of {borrowerName}
<br/><br/><br/><br/>

`;