--
-- PostgreSQL database dump
--

\restrict f0v350P8Bkn6pJhlXgVzWkYr2apRygAQXKNxraDUPdmGylRhDfuUtr1gqFlnZ0v

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-28 12:26:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 29359)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 243 (class 1259 OID 37807)
-- Name: Calificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Calificacion" (
    id integer NOT NULL,
    nota integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "autorId" integer NOT NULL,
    "usuarioId" integer NOT NULL
);


ALTER TABLE public."Calificacion" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 37806)
-- Name: Calificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Calificacion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Calificacion_id_seq" OWNER TO postgres;

--
-- TOC entry 5176 (class 0 OID 0)
-- Dependencies: 242
-- Name: Calificacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Calificacion_id_seq" OWNED BY public."Calificacion".id;


--
-- TOC entry 229 (class 1259 OID 29484)
-- Name: Comentario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comentario" (
    id integer NOT NULL,
    contenido text NOT NULL,
    "fechaEmision" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_usuario integer NOT NULL,
    "id_soporteGrafico" integer,
    id_reporte integer NOT NULL
);


ALTER TABLE public."Comentario" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 29483)
-- Name: Comentario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comentario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comentario_id_seq" OWNER TO postgres;

--
-- TOC entry 5177 (class 0 OID 0)
-- Dependencies: 228
-- Name: Comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comentario_id_seq" OWNED BY public."Comentario".id;


--
-- TOC entry 245 (class 1259 OID 40032)
-- Name: DenunciaReporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DenunciaReporte" (
    id integer NOT NULL,
    motivo text NOT NULL,
    detalle text NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_autor integer NOT NULL,
    id_reporte integer NOT NULL
);


ALTER TABLE public."DenunciaReporte" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 40031)
-- Name: DenunciaReporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DenunciaReporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DenunciaReporte_id_seq" OWNER TO postgres;

--
-- TOC entry 5178 (class 0 OID 0)
-- Dependencies: 244
-- Name: DenunciaReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DenunciaReporte_id_seq" OWNED BY public."DenunciaReporte".id;


--
-- TOC entry 237 (class 1259 OID 29531)
-- Name: IndiceMapa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."IndiceMapa" (
    id integer NOT NULL,
    ciudad text NOT NULL,
    barrio text NOT NULL,
    "id_tipoDeIncidencia" integer NOT NULL
);


ALTER TABLE public."IndiceMapa" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 29530)
-- Name: IndiceMapa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."IndiceMapa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."IndiceMapa_id_seq" OWNER TO postgres;

--
-- TOC entry 5179 (class 0 OID 0)
-- Dependencies: 236
-- Name: IndiceMapa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."IndiceMapa_id_seq" OWNED BY public."IndiceMapa".id;


--
-- TOC entry 239 (class 1259 OID 29544)
-- Name: IndiceReporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."IndiceReporte" (
    id integer NOT NULL,
    "id_indiceMapa" integer NOT NULL,
    id_reporte integer NOT NULL
);


ALTER TABLE public."IndiceReporte" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 29543)
-- Name: IndiceReporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."IndiceReporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."IndiceReporte_id_seq" OWNER TO postgres;

--
-- TOC entry 5180 (class 0 OID 0)
-- Dependencies: 238
-- Name: IndiceReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."IndiceReporte_id_seq" OWNED BY public."IndiceReporte".id;


--
-- TOC entry 241 (class 1259 OID 35138)
-- Name: Like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Like" (
    id integer NOT NULL,
    "usuarioId" integer NOT NULL,
    "reporteId" integer NOT NULL
);


ALTER TABLE public."Like" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 35137)
-- Name: Like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Like_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Like_id_seq" OWNER TO postgres;

--
-- TOC entry 5181 (class 0 OID 0)
-- Dependencies: 240
-- Name: Like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Like_id_seq" OWNED BY public."Like".id;


--
-- TOC entry 233 (class 1259 OID 29510)
-- Name: MapaGeografico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MapaGeografico" (
    id integer NOT NULL,
    zoom integer NOT NULL,
    id_ubicacion integer NOT NULL,
    "id_indiceMapa" integer NOT NULL
);


ALTER TABLE public."MapaGeografico" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 29509)
-- Name: MapaGeografico_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MapaGeografico_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MapaGeografico_id_seq" OWNER TO postgres;

--
-- TOC entry 5182 (class 0 OID 0)
-- Dependencies: 232
-- Name: MapaGeografico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MapaGeografico_id_seq" OWNED BY public."MapaGeografico".id;


--
-- TOC entry 235 (class 1259 OID 29521)
-- Name: MapaReporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MapaReporte" (
    id integer NOT NULL,
    "id_mapaGeografico" integer NOT NULL,
    id_reporte integer NOT NULL
);


ALTER TABLE public."MapaReporte" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 29520)
-- Name: MapaReporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MapaReporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MapaReporte_id_seq" OWNER TO postgres;

--
-- TOC entry 5183 (class 0 OID 0)
-- Dependencies: 234
-- Name: MapaReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MapaReporte_id_seq" OWNED BY public."MapaReporte".id;


--
-- TOC entry 223 (class 1259 OID 29427)
-- Name: Reporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reporte" (
    id integer NOT NULL,
    descripcion text NOT NULL,
    "fechaCreacion" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado text NOT NULL,
    id_usuario integer NOT NULL,
    id_ubicacion integer NOT NULL,
    "id_tipoDeIncidencia" integer NOT NULL,
    "id_soporteGrafico" integer NOT NULL,
    titulo text NOT NULL
);


ALTER TABLE public."Reporte" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 29426)
-- Name: Reporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Reporte_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reporte_id_seq" OWNER TO postgres;

--
-- TOC entry 5184 (class 0 OID 0)
-- Dependencies: 222
-- Name: Reporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reporte_id_seq" OWNED BY public."Reporte".id;


--
-- TOC entry 231 (class 1259 OID 29498)
-- Name: SoporteGrafico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SoporteGrafico" (
    id integer NOT NULL,
    tipo text NOT NULL,
    archivo text NOT NULL,
    "fechaEmision" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."SoporteGrafico" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 29497)
-- Name: SoporteGrafico_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SoporteGrafico_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SoporteGrafico_id_seq" OWNER TO postgres;

--
-- TOC entry 5185 (class 0 OID 0)
-- Dependencies: 230
-- Name: SoporteGrafico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SoporteGrafico_id_seq" OWNED BY public."SoporteGrafico".id;


--
-- TOC entry 227 (class 1259 OID 29459)
-- Name: TipoDeIncidencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TipoDeIncidencia" (
    id integer NOT NULL,
    categoria text NOT NULL,
    descripcion text NOT NULL
);


ALTER TABLE public."TipoDeIncidencia" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 29458)
-- Name: TipoDeIncidencia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TipoDeIncidencia_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TipoDeIncidencia_id_seq" OWNER TO postgres;

--
-- TOC entry 5186 (class 0 OID 0)
-- Dependencies: 226
-- Name: TipoDeIncidencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TipoDeIncidencia_id_seq" OWNED BY public."TipoDeIncidencia".id;


--
-- TOC entry 225 (class 1259 OID 29444)
-- Name: Ubicacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ubicacion" (
    id integer NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    direccion text NOT NULL,
    ciudad text NOT NULL,
    barrio text NOT NULL
);


ALTER TABLE public."Ubicacion" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 29443)
-- Name: Ubicacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ubicacion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ubicacion_id_seq" OWNER TO postgres;

--
-- TOC entry 5187 (class 0 OID 0)
-- Dependencies: 224
-- Name: Ubicacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ubicacion_id_seq" OWNED BY public."Ubicacion".id;


--
-- TOC entry 221 (class 1259 OID 29411)
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    documento integer NOT NULL,
    email text NOT NULL,
    id_ubicacion integer NOT NULL,
    direccion text NOT NULL,
    password text NOT NULL,
    "bloqueadoHasta" timestamp(3) without time zone,
    "intentosFallidos" integer DEFAULT 0 NOT NULL,
    "fechaAlta" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 29410)
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Usuario_id_seq" OWNER TO postgres;

--
-- TOC entry 5188 (class 0 OID 0)
-- Dependencies: 220
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
-- TOC entry 219 (class 1259 OID 29360)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4938 (class 2604 OID 37810)
-- Name: Calificacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Calificacion" ALTER COLUMN id SET DEFAULT nextval('public."Calificacion_id_seq"'::regclass);


--
-- TOC entry 4929 (class 2604 OID 29487)
-- Name: Comentario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario" ALTER COLUMN id SET DEFAULT nextval('public."Comentario_id_seq"'::regclass);


--
-- TOC entry 4940 (class 2604 OID 40035)
-- Name: DenunciaReporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DenunciaReporte" ALTER COLUMN id SET DEFAULT nextval('public."DenunciaReporte_id_seq"'::regclass);


--
-- TOC entry 4935 (class 2604 OID 29534)
-- Name: IndiceMapa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa" ALTER COLUMN id SET DEFAULT nextval('public."IndiceMapa_id_seq"'::regclass);


--
-- TOC entry 4936 (class 2604 OID 29547)
-- Name: IndiceReporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte" ALTER COLUMN id SET DEFAULT nextval('public."IndiceReporte_id_seq"'::regclass);


--
-- TOC entry 4937 (class 2604 OID 35141)
-- Name: Like id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like" ALTER COLUMN id SET DEFAULT nextval('public."Like_id_seq"'::regclass);


--
-- TOC entry 4933 (class 2604 OID 29513)
-- Name: MapaGeografico id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico" ALTER COLUMN id SET DEFAULT nextval('public."MapaGeografico_id_seq"'::regclass);


--
-- TOC entry 4934 (class 2604 OID 29524)
-- Name: MapaReporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte" ALTER COLUMN id SET DEFAULT nextval('public."MapaReporte_id_seq"'::regclass);


--
-- TOC entry 4925 (class 2604 OID 29430)
-- Name: Reporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte" ALTER COLUMN id SET DEFAULT nextval('public."Reporte_id_seq"'::regclass);


--
-- TOC entry 4931 (class 2604 OID 29501)
-- Name: SoporteGrafico id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SoporteGrafico" ALTER COLUMN id SET DEFAULT nextval('public."SoporteGrafico_id_seq"'::regclass);


--
-- TOC entry 4928 (class 2604 OID 29462)
-- Name: TipoDeIncidencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoDeIncidencia" ALTER COLUMN id SET DEFAULT nextval('public."TipoDeIncidencia_id_seq"'::regclass);


--
-- TOC entry 4927 (class 2604 OID 29447)
-- Name: Ubicacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ubicacion" ALTER COLUMN id SET DEFAULT nextval('public."Ubicacion_id_seq"'::regclass);


--
-- TOC entry 4922 (class 2604 OID 29414)
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- TOC entry 5167 (class 0 OID 37807)
-- Dependencies: 243
-- Data for Name: Calificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Calificacion" (id, nota, "createdAt", "autorId", "usuarioId") FROM stdin;
10	9	2025-11-27 04:55:33.566	2	5
18	9	2025-11-27 05:02:26.72	4	5
25	10	2025-11-27 05:08:12.972	4	2
1	10	2025-11-27 04:24:02.919	2	4
\.


--
-- TOC entry 5153 (class 0 OID 29484)
-- Dependencies: 229
-- Data for Name: Comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comentario" (id, contenido, "fechaEmision", id_usuario, "id_soporteGrafico", id_reporte) FROM stdin;
8	Fue un desastre!! Yo estuve ahí, el auto quedo destruido...	2025-11-25 23:53:20.671	2	\N	29
9	Tienen que solucionar esto urgente, han encontrado cucarachas y alacranes en los edificios 😥	2025-11-25 23:54:22.837	2	\N	28
10	Ya lo solucionaron!! Adjunto una foto, pase anoche por el lugar.	2025-11-25 23:55:08.656	2	39	26
11	Si... una lastima que haya gente tan imprudente así 😔	2025-11-25 23:55:57.486	4	\N	29
12	Esperemos la policía pueda tener los recursos para prevenir estos robos!! Falta mas vigilancia.	2025-11-25 23:56:54.136	4	\N	27
13	Todo parece seguir igual!! Miren, pase el otro día por ahí, mucho olor, es desagradable.	2025-11-25 23:57:26.322	4	40	24
14	Que locura!! Varias personas resultaron heridas del urbano... ni se diga del conductor del vehículo, esta hospitalizado.	2025-11-25 23:58:24.194	5	\N	29
15	Totalmente, ahora patrullan mas las zonas por la noche, entre semana principalmente, el gobierno mando dos patrulleros mas para hacer vigilancia.	2025-11-25 23:59:26.256	5	41	27
\.


--
-- TOC entry 5169 (class 0 OID 40032)
-- Dependencies: 245
-- Data for Name: DenunciaReporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DenunciaReporte" (id, motivo, detalle, fecha, id_autor, id_reporte) FROM stdin;
5	Contenido ofensivo	Esta es una prueba de denuncia para un reporte.	2025-11-28 02:39:51.348	2	29
6	Información incorrecta	Esta es una prueba de denuncia de reporte.	2025-11-28 02:41:24.607	4	23
\.


--
-- TOC entry 5161 (class 0 OID 29531)
-- Dependencies: 237
-- Data for Name: IndiceMapa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."IndiceMapa" (id, ciudad, barrio, "id_tipoDeIncidencia") FROM stdin;
\.


--
-- TOC entry 5163 (class 0 OID 29544)
-- Dependencies: 239
-- Data for Name: IndiceReporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."IndiceReporte" (id, "id_indiceMapa", id_reporte) FROM stdin;
\.


--
-- TOC entry 5165 (class 0 OID 35138)
-- Dependencies: 241
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Like" (id, "usuarioId", "reporteId") FROM stdin;
1	2	28
2	5	26
3	5	24
4	4	28
5	4	27
6	4	23
7	4	24
8	2	27
9	2	26
10	5	29
11	5	23
\.


--
-- TOC entry 5157 (class 0 OID 29510)
-- Dependencies: 233
-- Data for Name: MapaGeografico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MapaGeografico" (id, zoom, id_ubicacion, "id_indiceMapa") FROM stdin;
\.


--
-- TOC entry 5159 (class 0 OID 29521)
-- Dependencies: 235
-- Data for Name: MapaReporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MapaReporte" (id, "id_mapaGeografico", id_reporte) FROM stdin;
\.


--
-- TOC entry 5147 (class 0 OID 29427)
-- Dependencies: 223
-- Data for Name: Reporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reporte" (id, descripcion, "fechaCreacion", estado, id_usuario, id_ubicacion, "id_tipoDeIncidencia", "id_soporteGrafico", titulo) FROM stdin;
27	La pasada noche del domingo, caminando por la calle Sarmiento, cerca de la plaza del pueblo, fui agredido por 2 masculinos que robaron mi celular, andar con cuidado.	2025-11-21 00:15:56.133	pendiente	5	9	4	33	Robo en pleno centro de Villa del Rosario.
28	En la calle Obispo Oro, en Nueva Córdoba, se encuentra un sitio baldío entre dos edificios, el cual no está mantenido ni cuidado, generando plagas de insectos y roedores que infectan las zonas aledañas.	2025-11-24 20:07:00.733	pendiente	5	10	5	34	Sitio Baldío con Plagas.
24	En la calle Obispo Salguero, altura 500, se encuentran dos contenedores completamente rebalsados de basura, impidiendo el tránsito y generando malos olores.\r\n\r\nActualización: \r\nAhora mantienen los contenedores más limpios y recolectan la basura más seguido, no se volvió a ver el problema en el último mes.	2025-11-19 23:30:11.642	resuelto	2	7	2	30	Basura en la calle Obispo Salguero.
23	En la Av. Chacabuco, en la esquina con Obispo Oro, se encuentra un bache de gran profundidad, tengan cuidado, puede salir alguien lastimado o un auto dañarse, se requiere reparación urgente.	2025-11-19 21:31:42.522	en revisión	2	6	1	29	Bache en Av. Principal, Córdoba Capital.
29	En la calle Bv. Illia, a dos cuadras de la terminal de ómnibus de Córdoba, un colectivo colisiono con un auto que cruzo el semáforo en rojo, ocasionando un corte en la calle, circular con precaución.	2025-11-25 00:02:47.288	resuelto	4	11	1	35	Accidente de tráfico en Bv Illia.
26	En la calle San Lorenzo, entre Bv Chacabuco y Obispo Salguero, frente a un terreno baldío, se encuentra una luminaria pública quemada, dejando en oscuras la calle a la noche.	2025-11-20 23:39:11.277	en revisión	4	8	3	32	Luminaria pública quemada en calle San Lorenzo.
\.


--
-- TOC entry 5155 (class 0 OID 29498)
-- Dependencies: 231
-- Data for Name: SoporteGrafico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SoporteGrafico" (id, tipo, archivo, "fechaEmision") FROM stdin;
29	image/png	/uploads/file-1763587902509-368573757.png	2025-11-25 17:49:02.338
32	image/png	/uploads/file-1763681951265-814925023.png	2025-11-25 17:49:02.338
33	image/png	/uploads/file-1763684156070-413668116.png	2025-11-25 17:49:02.338
34	image/png	/uploads/file-1764014820572-353224420.png	2025-11-25 17:49:02.338
35	image/png	/uploads/file-1764028967112-915318279.png	2025-11-25 17:49:02.338
39	image/png	/uploads/file-1764114908649-897112779.png	2025-11-25 23:55:08.654
40	image/png	/uploads/file-1764115046310-362945344.png	2025-11-25 23:57:26.32
41	image/png	/uploads/file-1764115166251-145481898.png	2025-11-25 23:59:26.253
30	imagen	/uploads/1764296937332-Residuos.png	2025-11-25 17:49:02.338
\.


--
-- TOC entry 5151 (class 0 OID 29459)
-- Dependencies: 227
-- Data for Name: TipoDeIncidencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TipoDeIncidencia" (id, categoria, descripcion) FROM stdin;
1	Tráfico y Vía Pública	Incidencias ocurridas en la vía pública y relacionados con el tráfico.
2	Residuos Viales	Incidencias relacionadas con residuos presentes en la vía pública que generan obstrucción y malos olores.
3	Alumbrado Público y Sistema Eléctrico	Incidencias relacionadas al sistema eléctrico y alumbrado público.
4	Robo y Vandalismo	Incidencias relacionadas a la delincuencia, robo o inseguridad.
5	Varios	Incidencias que responden a diferentes tipos de circunstancias y características.
\.


--
-- TOC entry 5149 (class 0 OID 29444)
-- Dependencies: 225
-- Data for Name: Ubicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ubicacion" (id, latitud, longitud, direccion, ciudad, barrio) FROM stdin;
6	-31.426736	-64.1841379	Boulevard Chacabuco, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	Córdoba	Nueva Córdoba
7	-31.4223063	-64.1807261	Obispo Salguero, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	Córdoba	Nueva Córdoba
8	-31.4244545	-64.1829984	San Lorenzo, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	Córdoba	Nueva Córdoba
9	-31.5540883	-63.5352431	Villa del Rosario, Pedanía Villa del Rosario, Córdoba, X5963, Argentina		
10	-31.4247228	-64.1862402	Obispo Oro, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	Córdoba	Nueva Córdoba
11	-31.4212525	-64.1847461	Boulevard Arturo Illia, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	Córdoba	Nueva Córdoba
\.


--
-- TOC entry 5145 (class 0 OID 29411)
-- Dependencies: 221
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (id, nombre, apellido, documento, email, id_ubicacion, direccion, password, "bloqueadoHasta", "intentosFallidos", "fechaAlta") FROM stdin;
2	Facundo	Leiva	45091613	facundo.leiva.dev@gmail.com	8	San Lorenzo 373	$argon2id$v=19$m=65536,t=3,p=4$5dFy9LuuumoaeMuViuzXXw$ynSQN39EesUJJBASjnG4VPbyp2qNzNyhH3rXAJKFH/U	\N	0	2025-11-20 17:59:55.702
4	Celeste	Hernandez	45374504	celehernandez@gmail.com	7	Obispo Salguero, Nueva Córdoba, Córdoba, Pedanía Capital, Córdoba, X5000, Argentina	$argon2id$v=19$m=65536,t=3,p=4$NFC5OXtCoZJyz04hIjUIbw$mBuC6Sq+t43w64c/Q7O0/7NvHmQj5eTg33XejxD+Se0	\N	0	2025-11-20 22:07:12.903
5	Cristian	Crettino	45754271	criscrettino@gmail.com	9	Villa del Rosario, Pedanía Villa del Rosario, Córdoba, X5963, Argentina	$argon2id$v=19$m=65536,t=3,p=4$VMLc1R3fXgjZ2fsBMM77Cw$xivOhaxjRIJn8pUJNg/+AxRIaHAGh5S66yAYCuuGb9w	\N	0	2025-11-21 00:00:25.423
\.


--
-- TOC entry 5143 (class 0 OID 29360)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ca487f4e-7c0b-498d-86bc-0fca641b0aa0	acdea6d1a72c121e0eb66cf98fcd4cd646143782ccce3920b77bd723473937cf	2025-11-06 18:08:18.375811-03	20251001222028_init	\N	\N	2025-11-06 18:08:18.362884-03	1
10f4e985-5dce-47ac-a7a8-0ec9664845a4	6fdffa8906bf937776d96f46e234e7a87c9b13313ea1ea7cf3af8254417473a7	2025-11-06 18:08:18.392998-03	20251001222320_init	\N	\N	2025-11-06 18:08:18.376827-03	1
6e115a48-415a-4d08-94d5-f332f7f2400e	6e725b4aa3d654bbfc480a6b75394a95d1ef07db80e242163c6c287a7e6b9528	2025-11-24 17:22:13.994776-03	20251124202213_modelo_likes_cambios_menores	\N	\N	2025-11-24 17:22:13.949529-03	1
9c05ee68-e46b-423a-a052-cba686de3bee	18c8223f5d5aa095909934ec897bef06d86d4819e22285e2a392c1e2c16da164	2025-11-06 18:08:18.490334-03	20251102203132_estructuracion	\N	\N	2025-11-06 18:08:18.393787-03	1
2d522a86-98f6-4eb5-9cd4-c41e29b24b49	3eb5c3b64759ecb869e27ff2dc54a449897e86118e54dc51daccfe681152bac3	2025-11-06 18:08:18.498242-03	20251103210813_correccion_tabla_usuarios_agregado_direccion	\N	\N	2025-11-06 18:08:18.491321-03	1
c12e3ac2-8f86-4510-a6a1-d35766afd360	db5a376b4c411ed629aec014170b012e5cb0f7a08bda57fee58677750d67cbed	2025-11-27 19:59:10.386711-03	20251127225910_cambios_minimos_denuncia	\N	\N	2025-11-27 19:59:10.373403-03	1
50e2f8b0-bc2e-46a2-9a51-54010851fafa	848d93ff91d61453cea699bcfb2da4c24a31d9edbaadc95fa3dae22146d97bcf	2025-11-06 18:08:18.503172-03	20251106155524_agregado_de_bloqueo_usuario	\N	\N	2025-11-06 18:08:18.499048-03	1
8c007390-4cc8-4f51-97f9-b17d61921ffb	5c52b55a175de8cd3643deaf29de48c00c09a7c0fc64f0066ba84e6978017608	2025-11-25 17:38:03.715713-03	20251125203803_cambios_menores_implementacion_de_comentarios	\N	\N	2025-11-25 17:38:03.681023-03	1
8c608f97-cee2-4704-92bc-b133a7db415e	2cb0c40dd425d939f10b2a395ccba74ed2e93b9eaac2d8352b15bca49c42a763	2025-11-06 18:08:18.51059-03	20251106163044_cambios_menores	\N	\N	2025-11-06 18:08:18.504334-03	1
43315bd3-e12a-4c85-b54c-26724672495f	0220cd69436864d12ee4f5f52607247ed798307874738a04deec4ba5ddc2cb9c	2025-11-06 18:08:27.503024-03	20251106210827_cambios_menores_reporte	\N	\N	2025-11-06 18:08:27.496557-03	1
894c9d82-c071-4315-b5d2-e1500a79c837	10d4e60a78bae43074091dd36c5e682b4533670b43a71b72bd4218a07b2a613c	2025-11-07 19:39:25.234957-03	20251107223925_cambios_menores_ubicacion	\N	\N	2025-11-07 19:39:25.201987-03	1
832f7fa7-5287-4382-9e2a-2a2170da3570	442ab98f805dfd48bc0be93144850e9e1baed017cda1c9c17ca6b70ae391a0c6	2025-11-25 17:49:02.345599-03	20251125204902_cambios_menores_comentario	\N	\N	2025-11-25 17:49:02.336105-03	1
3c147a96-1f5b-46a4-83ce-02766986aa08	94efd52c4c04efc097cf083727f6cd615be5efc64b2f0203ec9693fd4b6fec2f	2025-11-13 14:56:29.850195-03	20251113175629_cambios_en_la_db	\N	\N	2025-11-13 14:56:29.832107-03	1
ea57ea5a-24e4-4d32-8767-a9ca60c2cfea	1988ae8ac4c5bb36ffaaa7303dadd1bfc08f8625196d322279fa3b357cced8b6	2025-11-19 17:00:31.064272-03	20251119200031_cambios_en_modelo_reporte	\N	\N	2025-11-19 17:00:31.04622-03	1
f91ab606-99fc-45f7-a09d-827ebecbdbc6	bc1fe06cfdcc36a48b7863a6f6c9ac6db33c409b11050f07df923803c74b660f	2025-11-19 17:21:00.442034-03	20251119202100_cambios_menores_reporte	\N	\N	2025-11-19 17:21:00.427181-03	1
a39edf72-1f4a-47ba-98a6-bc3e36527627	7f8f0f8c824033b1a2d36d7d727ce8048b723e6aa5d0809dedd5d8fea4aa7976	2025-11-25 18:33:53.387696-03	20251125213353_cambios_comentario	\N	\N	2025-11-25 18:33:53.3754-03	1
44e1912b-1a30-4374-b1e0-0f81dd390a80	3736f7917e984c75a9b73a7a53b66b1e243bbdff37851e93d57bc0288ff1687b	2025-11-19 17:32:26.916561-03	20251119203226_cambios_menores_comentarios_reporte	\N	\N	2025-11-19 17:32:26.890957-03	1
ac5d68cd-9b20-4932-ab7e-029082aab813	aa5de0cb2e070c10339ce5fa28f24eedc2e62d483ee2b31adc30bb9993d4ffdb	2025-11-20 17:59:55.71572-03	20251120205955_cambios_menores_usuario	\N	\N	2025-11-20 17:59:55.69906-03	1
bc77ea10-bd0a-4a51-afa0-5c213b3f2a4e	d631e73dc50abdf36bf5ae1e9f69c90617d0bb7c6e2cb933f42957aa9d3213f2	2025-11-27 00:54:01.658229-03	20251127035401_agregado_calificaciones	\N	\N	2025-11-27 00:54:01.613824-03	1
c0643869-ca36-49c6-9080-a56376365eab	6802415dec50feabb4a584b1afb03bc4cf258c6f945c066f54556f0fca3a31c5	2025-11-27 01:27:58.746752-03	20251127042758_cambios_minimos_calificaciones	\N	\N	2025-11-27 01:27:58.738091-03	1
7df14441-7075-48fd-a52d-7bf0b2c9fa15	0326f9beec997170fbd1b5a1d9e45cc2d71edf63eef65478248afdfe8dd5ec7d	2025-11-27 18:24:09.675903-03	20251127212409_implementacion_denuncias	\N	\N	2025-11-27 18:24:09.642122-03	1
462033d6-7135-4e1e-a438-b0a464c6bcab	8188a8ad129d6b4bbb321067fa3123fe4b9e452d6a1383dbade50448de863913	2025-11-27 19:23:10.938122-03	20251127222310_cambios_denuncia_reporte	\N	\N	2025-11-27 19:23:10.896996-03	1
\.


--
-- TOC entry 5189 (class 0 OID 0)
-- Dependencies: 242
-- Name: Calificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Calificacion_id_seq"', 28, true);


--
-- TOC entry 5190 (class 0 OID 0)
-- Dependencies: 228
-- Name: Comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comentario_id_seq"', 15, true);


--
-- TOC entry 5191 (class 0 OID 0)
-- Dependencies: 244
-- Name: DenunciaReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DenunciaReporte_id_seq"', 6, true);


--
-- TOC entry 5192 (class 0 OID 0)
-- Dependencies: 236
-- Name: IndiceMapa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."IndiceMapa_id_seq"', 1, false);


--
-- TOC entry 5193 (class 0 OID 0)
-- Dependencies: 238
-- Name: IndiceReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."IndiceReporte_id_seq"', 1, false);


--
-- TOC entry 5194 (class 0 OID 0)
-- Dependencies: 240
-- Name: Like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Like_id_seq"', 11, true);


--
-- TOC entry 5195 (class 0 OID 0)
-- Dependencies: 232
-- Name: MapaGeografico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MapaGeografico_id_seq"', 1, false);


--
-- TOC entry 5196 (class 0 OID 0)
-- Dependencies: 234
-- Name: MapaReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MapaReporte_id_seq"', 1, false);


--
-- TOC entry 5197 (class 0 OID 0)
-- Dependencies: 222
-- Name: Reporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reporte_id_seq"', 29, true);


--
-- TOC entry 5198 (class 0 OID 0)
-- Dependencies: 230
-- Name: SoporteGrafico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SoporteGrafico_id_seq"', 41, true);


--
-- TOC entry 5199 (class 0 OID 0)
-- Dependencies: 226
-- Name: TipoDeIncidencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoDeIncidencia_id_seq"', 1, false);


--
-- TOC entry 5200 (class 0 OID 0)
-- Dependencies: 224
-- Name: Ubicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ubicacion_id_seq"', 11, true);


--
-- TOC entry 5201 (class 0 OID 0)
-- Dependencies: 220
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 5, true);


--
-- TOC entry 4971 (class 2606 OID 37818)
-- Name: Calificacion Calificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Calificacion"
    ADD CONSTRAINT "Calificacion_pkey" PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 29496)
-- Name: Comentario Comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_pkey" PRIMARY KEY (id);


--
-- TOC entry 4975 (class 2606 OID 40046)
-- Name: DenunciaReporte DenunciaReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DenunciaReporte"
    ADD CONSTRAINT "DenunciaReporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 4964 (class 2606 OID 29542)
-- Name: IndiceMapa IndiceMapa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa"
    ADD CONSTRAINT "IndiceMapa_pkey" PRIMARY KEY (id);


--
-- TOC entry 4966 (class 2606 OID 29552)
-- Name: IndiceReporte IndiceReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 35146)
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- TOC entry 4960 (class 2606 OID 29519)
-- Name: MapaGeografico MapaGeografico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_pkey" PRIMARY KEY (id);


--
-- TOC entry 4962 (class 2606 OID 29529)
-- Name: MapaReporte MapaReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 4950 (class 2606 OID 29442)
-- Name: Reporte Reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_pkey" PRIMARY KEY (id);


--
-- TOC entry 4958 (class 2606 OID 29508)
-- Name: SoporteGrafico SoporteGrafico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SoporteGrafico"
    ADD CONSTRAINT "SoporteGrafico_pkey" PRIMARY KEY (id);


--
-- TOC entry 4954 (class 2606 OID 29469)
-- Name: TipoDeIncidencia TipoDeIncidencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoDeIncidencia"
    ADD CONSTRAINT "TipoDeIncidencia_pkey" PRIMARY KEY (id);


--
-- TOC entry 4952 (class 2606 OID 29457)
-- Name: Ubicacion Ubicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ubicacion"
    ADD CONSTRAINT "Ubicacion_pkey" PRIMARY KEY (id);


--
-- TOC entry 4948 (class 2606 OID 29425)
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- TOC entry 4943 (class 2606 OID 29373)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4972 (class 1259 OID 38532)
-- Name: Calificacion_usuarioId_autorId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Calificacion_usuarioId_autorId_key" ON public."Calificacion" USING btree ("usuarioId", "autorId");


--
-- TOC entry 4973 (class 1259 OID 40871)
-- Name: DenunciaReporte_id_autor_id_reporte_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "DenunciaReporte_id_autor_id_reporte_key" ON public."DenunciaReporte" USING btree (id_autor, id_reporte);


--
-- TOC entry 4969 (class 1259 OID 35147)
-- Name: Like_usuarioId_reporteId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Like_usuarioId_reporteId_key" ON public."Like" USING btree ("usuarioId", "reporteId");


--
-- TOC entry 4944 (class 1259 OID 29630)
-- Name: Usuario_documento_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_documento_key" ON public."Usuario" USING btree (documento);


--
-- TOC entry 4945 (class 1259 OID 29553)
-- Name: Usuario_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_email_key" ON public."Usuario" USING btree (email);


--
-- TOC entry 4946 (class 1259 OID 29627)
-- Name: Usuario_password_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_password_key" ON public."Usuario" USING btree (password);


--
-- TOC entry 4993 (class 2606 OID 37819)
-- Name: Calificacion Calificacion_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Calificacion"
    ADD CONSTRAINT "Calificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4981 (class 2606 OID 35803)
-- Name: Comentario Comentario_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4982 (class 2606 OID 37129)
-- Name: Comentario Comentario_id_soporteGrafico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES public."SoporteGrafico"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4983 (class 2606 OID 29580)
-- Name: Comentario Comentario_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4994 (class 2606 OID 40047)
-- Name: DenunciaReporte DenunciaReporte_id_autor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DenunciaReporte"
    ADD CONSTRAINT "DenunciaReporte_id_autor_fkey" FOREIGN KEY (id_autor) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4995 (class 2606 OID 40052)
-- Name: DenunciaReporte DenunciaReporte_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DenunciaReporte"
    ADD CONSTRAINT "DenunciaReporte_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4988 (class 2606 OID 29610)
-- Name: IndiceMapa IndiceMapa_id_tipoDeIncidencia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa"
    ADD CONSTRAINT "IndiceMapa_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES public."TipoDeIncidencia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4989 (class 2606 OID 29615)
-- Name: IndiceReporte IndiceReporte_id_indiceMapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES public."IndiceMapa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4990 (class 2606 OID 29620)
-- Name: IndiceReporte IndiceReporte_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4991 (class 2606 OID 35153)
-- Name: Like Like_reporteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4992 (class 2606 OID 35148)
-- Name: Like Like_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4984 (class 2606 OID 29595)
-- Name: MapaGeografico MapaGeografico_id_indiceMapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES public."IndiceMapa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4985 (class 2606 OID 29590)
-- Name: MapaGeografico MapaGeografico_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4986 (class 2606 OID 29600)
-- Name: MapaReporte MapaReporte_id_mapaGeografico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_id_mapaGeografico_fkey" FOREIGN KEY ("id_mapaGeografico") REFERENCES public."MapaGeografico"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4987 (class 2606 OID 29605)
-- Name: MapaReporte MapaReporte_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4977 (class 2606 OID 29575)
-- Name: Reporte Reporte_id_soporteGrafico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES public."SoporteGrafico"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4978 (class 2606 OID 29570)
-- Name: Reporte Reporte_id_tipoDeIncidencia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES public."TipoDeIncidencia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4979 (class 2606 OID 29565)
-- Name: Reporte Reporte_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4980 (class 2606 OID 29560)
-- Name: Reporte Reporte_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4976 (class 2606 OID 29555)
-- Name: Usuario Usuario_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 5175 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-11-28 12:26:39

--
-- PostgreSQL database dump complete
--

\unrestrict f0v350P8Bkn6pJhlXgVzWkYr2apRygAQXKNxraDUPdmGylRhDfuUtr1gqFlnZ0v

