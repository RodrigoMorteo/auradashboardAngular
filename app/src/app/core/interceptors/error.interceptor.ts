import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status) {
        // Server-side errors
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized: Please log in again.';
            // Optionally, you could add logic here to redirect to a login page
            break;
          case 403:
            errorMessage = "Forbidden: You don't have permission to access this resource.";
            break;
          case 404:
            errorMessage = 'Not Found: The requested resource could not be found.';
            break;
          case 500:
            errorMessage = 'Server Error: Something went wrong on the server.';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            break;
        }
      } else if (error.message) {
        // Network errors or other issues
        errorMessage = `Network Error: ${error.message}`;
      }

      toastr.error(errorMessage, 'Error', {
        closeButton: true,
        disableTimeOut: true,
      });

      // Re-throw the error to be caught by the subscriber
      return throwError(() => error);
    })
  );
};
