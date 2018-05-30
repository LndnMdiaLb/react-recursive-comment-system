/*
    Unique Integer creator
*/
export const uuint= _ => Math.random().toString(36).substr(-8) ;


/*
    Convert TimeStamp into date, day, date number, month, year
*/
export const convertTimeStamp= timestamp  =>
        {	const date = new Date( timestamp ) ;
            return  {   date,
                        day: [  'Sun' , 'Mon' , 'Tue' ,
                                'Wed' , 'Thu' , 'Fri' ,
                                'Sat' ][ date.getDay() ] ,
                        number: date.getDate().toString() ,
                        month: [    'Jan' , 'Feb' , 'Mar' ,
                                    'Apr' , 'May' , 'Jun' ,
                                    'Jul' , 'Aug' , 'Sep' ,
                                    'Oct' , 'Nov' , 'Dec'  ][ date.getMonth() ] ,
                        year: date.getFullYear().toString()
                    } } ;