#include <stdio.h>

#define size 5

int arr[size];
int top = -1;

void push(int item)
{
    if (top == size- 1)
    {
	printf("\nStack Overflow");
    }
    else
    {

	arr[++top]=item;
       printf("\n%d pushed into stack", item);
     }
    }
   int pop()
{
    if (top == -1)
    {
	printf("\nStack Underflow");
    }
    else
    {

       printf("%d", arr [top--]);
    }
}


void display()
{
    int i;
    if (top == -1)
    {
	printf("\nStack is empty");
    }
    else
    {
	printf("\nStack elements are:\n");
	for (i = top; i >= 0; i--)
	{
	    printf("%d\n", arr[i]);
	}
    }
}

void main()
{
    int ch, ch2,item,x;

	do{

	printf("\n===== MAIN MENU =====");
	printf("\n1. Static Implementation");
	printf("\n2. Dynamic Implementation");
	printf("\n3. Application");
	printf("\n4. Exit");
	printf("\nEnter your choice: ");
	scanf("%d", &ch);

	switch (ch)
	{
	case 1:

	    {
	    do{
		printf("\n1. Push");
		printf("\n2. Pop");
		printf("\n3. Display");
		printf("\n4. Exit to Main Menu");
		printf("\nEnter your choice: ");
		scanf("%d", &ch2);

		if (ch2== 4)
		    break;

		switch (ch2)
		{
	       case 1:

	       printf("\nEnter element: ");
	       scanf("%d", &item);
	       push(item);
	       break;

		case 2:
		     x = pop();
		    if (top != -1)
		    printf("\nPopped element=%d",x);
		     break;

		case 3:
		    display();
		    break;
		case 4:
		  ch2=4;

		  break;

		default:
		    printf("\nInvalid choice");
		}
		}while(ch!=4);
	    }
	    break;

	case 2:
	    printf("\nDynamic implementation ");
	    break;

	case 3:
	    printf("\nApplication ");
	    break;

	case 4:
	    ch=4;

	default:
	    printf("\nWrong choice");
	}
	}while(ch!=4);
    }
