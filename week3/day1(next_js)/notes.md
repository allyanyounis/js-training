
Component	                      Analogy	                                                                       What it does in code
URL	                    The physical street address of the pizza shop.	                                          /api/order-pizza
HTTP Method	           What you want to do there (Order vs. Cancel).	                                        POST or DELETE
Route Handler	        The kitchen staff who receives your order, cooks it, and hands it to you.	             The actual code function that talks to the database and saves your order.


Summary:

The URL is the path used to reach the server. The Route Handler is the engine that executes the code once you get there.


Difference between useActionState and useFormStatus
useActionState                              useFormStatus
Manages action result state	                Reads form submission status
Useful for validation errors	            Useful for disabling a submit button
Returns state, action and pending status	Returns form status information