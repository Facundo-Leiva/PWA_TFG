import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

/*
Helper de utilidades para las fechas en Frontend
*/

const argentinaTZ = 'America/Argentina/Cordoba';

/*
Convierte una fecha ISO a la hora local de Argentina y la formatea
*/
export function formatDateToLocal(dateString: string): string {
    const utcDate = parseISO(dateString);
    const zonedDate = toZonedTime(utcDate, argentinaTZ);
    return format(zonedDate, 'dd/MM/yyyy HH:mm');
}

/*
Devuelve la fecha relativa en español
*/
export function formatRelative(dateString: string): string {
    const utcDate = parseISO(dateString);
    return formatDistanceToNow(utcDate, { locale: es, addSuffix: true });
}
