--
-- PostgreSQL database dump
--

\restrict F4aGwxLVTCcpiE1AZMDv34YlAkJu7MchqsZH4s1ot06rvnkocpw57T9F8vQj9Gq

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comentario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comentario" (
    id integer NOT NULL,
    contenido text NOT NULL,
    "fechaEmision" timestamp(3) without time zone NOT NULL,
    id_usuario integer NOT NULL,
    "id_soporteGrafico" integer NOT NULL
);


ALTER TABLE public."Comentario" OWNER TO postgres;

--
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
-- Name: Comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comentario_id_seq" OWNED BY public."Comentario".id;


--
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
-- Name: IndiceMapa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."IndiceMapa_id_seq" OWNED BY public."IndiceMapa".id;


--
-- Name: IndiceReporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."IndiceReporte" (
    id integer NOT NULL,
    "id_indiceMapa" integer NOT NULL,
    id_reporte integer NOT NULL
);


ALTER TABLE public."IndiceReporte" OWNER TO postgres;

--
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
-- Name: IndiceReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."IndiceReporte_id_seq" OWNED BY public."IndiceReporte".id;


--
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
-- Name: MapaGeografico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MapaGeografico_id_seq" OWNED BY public."MapaGeografico".id;


--
-- Name: MapaReporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MapaReporte" (
    id integer NOT NULL,
    "id_mapaGeografico" integer NOT NULL,
    id_reporte integer NOT NULL
);


ALTER TABLE public."MapaReporte" OWNER TO postgres;

--
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
-- Name: MapaReporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MapaReporte_id_seq" OWNED BY public."MapaReporte".id;


--
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
-- Name: Reporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Reporte_id_seq" OWNED BY public."Reporte".id;


--
-- Name: SoporteGrafico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SoporteGrafico" (
    id integer NOT NULL,
    tipo text NOT NULL,
    archivo text NOT NULL
);


ALTER TABLE public."SoporteGrafico" OWNER TO postgres;

--
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
-- Name: SoporteGrafico_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SoporteGrafico_id_seq" OWNED BY public."SoporteGrafico".id;


--
-- Name: TipoDeIncidencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TipoDeIncidencia" (
    id integer NOT NULL,
    categoria text NOT NULL,
    descripcion text NOT NULL
);


ALTER TABLE public."TipoDeIncidencia" OWNER TO postgres;

--
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
-- Name: TipoDeIncidencia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TipoDeIncidencia_id_seq" OWNED BY public."TipoDeIncidencia".id;


--
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
-- Name: Ubicacion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ubicacion_id_seq" OWNED BY public."Ubicacion".id;


--
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
    "intentosFallidos" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
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
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
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
-- Name: Comentario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario" ALTER COLUMN id SET DEFAULT nextval('public."Comentario_id_seq"'::regclass);


--
-- Name: IndiceMapa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa" ALTER COLUMN id SET DEFAULT nextval('public."IndiceMapa_id_seq"'::regclass);


--
-- Name: IndiceReporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte" ALTER COLUMN id SET DEFAULT nextval('public."IndiceReporte_id_seq"'::regclass);


--
-- Name: MapaGeografico id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico" ALTER COLUMN id SET DEFAULT nextval('public."MapaGeografico_id_seq"'::regclass);


--
-- Name: MapaReporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte" ALTER COLUMN id SET DEFAULT nextval('public."MapaReporte_id_seq"'::regclass);


--
-- Name: Reporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte" ALTER COLUMN id SET DEFAULT nextval('public."Reporte_id_seq"'::regclass);


--
-- Name: SoporteGrafico id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SoporteGrafico" ALTER COLUMN id SET DEFAULT nextval('public."SoporteGrafico_id_seq"'::regclass);


--
-- Name: TipoDeIncidencia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoDeIncidencia" ALTER COLUMN id SET DEFAULT nextval('public."TipoDeIncidencia_id_seq"'::regclass);


--
-- Name: Ubicacion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ubicacion" ALTER COLUMN id SET DEFAULT nextval('public."Ubicacion_id_seq"'::regclass);


--
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- Data for Name: Comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comentario" (id, contenido, "fechaEmision", id_usuario, "id_soporteGrafico") FROM stdin;
\.


--
-- Data for Name: IndiceMapa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."IndiceMapa" (id, ciudad, barrio, "id_tipoDeIncidencia") FROM stdin;
\.


--
-- Data for Name: IndiceReporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."IndiceReporte" (id, "id_indiceMapa", id_reporte) FROM stdin;
\.


--
-- Data for Name: MapaGeografico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MapaGeografico" (id, zoom, id_ubicacion, "id_indiceMapa") FROM stdin;
\.


--
-- Data for Name: MapaReporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MapaReporte" (id, "id_mapaGeografico", id_reporte) FROM stdin;
\.


--
-- Data for Name: Reporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reporte" (id, descripcion, "fechaCreacion", estado, id_usuario, id_ubicacion, "id_tipoDeIncidencia", "id_soporteGrafico", titulo) FROM stdin;
\.


--
-- Data for Name: SoporteGrafico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SoporteGrafico" (id, tipo, archivo) FROM stdin;
\.


--
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
-- Data for Name: Ubicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ubicacion" (id, latitud, longitud, direccion, ciudad, barrio) FROM stdin;
999	-31	-64	San Lorenzo	Córdoba	Nueva Córdoba
4	-31.4166867	-64.1834193	Córdoba, Pedanía Capital, Córdoba, X5000, Argentina		
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (id, nombre, apellido, documento, email, id_ubicacion, direccion, password, "bloqueadoHasta", "intentosFallidos") FROM stdin;
2	Facundo	Leiva	45091613	facundo.leiva.dev@gmail.com	999	San Lorenzo 373	$argon2id$v=19$m=65536,t=3,p=4$5dFy9LuuumoaeMuViuzXXw$ynSQN39EesUJJBASjnG4VPbyp2qNzNyhH3rXAJKFH/U	\N	0
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ca487f4e-7c0b-498d-86bc-0fca641b0aa0	acdea6d1a72c121e0eb66cf98fcd4cd646143782ccce3920b77bd723473937cf	2025-11-06 18:08:18.375811-03	20251001222028_init	\N	\N	2025-11-06 18:08:18.362884-03	1
10f4e985-5dce-47ac-a7a8-0ec9664845a4	6fdffa8906bf937776d96f46e234e7a87c9b13313ea1ea7cf3af8254417473a7	2025-11-06 18:08:18.392998-03	20251001222320_init	\N	\N	2025-11-06 18:08:18.376827-03	1
9c05ee68-e46b-423a-a052-cba686de3bee	18c8223f5d5aa095909934ec897bef06d86d4819e22285e2a392c1e2c16da164	2025-11-06 18:08:18.490334-03	20251102203132_estructuracion	\N	\N	2025-11-06 18:08:18.393787-03	1
2d522a86-98f6-4eb5-9cd4-c41e29b24b49	3eb5c3b64759ecb869e27ff2dc54a449897e86118e54dc51daccfe681152bac3	2025-11-06 18:08:18.498242-03	20251103210813_correccion_tabla_usuarios_agregado_direccion	\N	\N	2025-11-06 18:08:18.491321-03	1
50e2f8b0-bc2e-46a2-9a51-54010851fafa	848d93ff91d61453cea699bcfb2da4c24a31d9edbaadc95fa3dae22146d97bcf	2025-11-06 18:08:18.503172-03	20251106155524_agregado_de_bloqueo_usuario	\N	\N	2025-11-06 18:08:18.499048-03	1
8c608f97-cee2-4704-92bc-b133a7db415e	2cb0c40dd425d939f10b2a395ccba74ed2e93b9eaac2d8352b15bca49c42a763	2025-11-06 18:08:18.51059-03	20251106163044_cambios_menores	\N	\N	2025-11-06 18:08:18.504334-03	1
43315bd3-e12a-4c85-b54c-26724672495f	0220cd69436864d12ee4f5f52607247ed798307874738a04deec4ba5ddc2cb9c	2025-11-06 18:08:27.503024-03	20251106210827_cambios_menores_reporte	\N	\N	2025-11-06 18:08:27.496557-03	1
894c9d82-c071-4315-b5d2-e1500a79c837	10d4e60a78bae43074091dd36c5e682b4533670b43a71b72bd4218a07b2a613c	2025-11-07 19:39:25.234957-03	20251107223925_cambios_menores_ubicacion	\N	\N	2025-11-07 19:39:25.201987-03	1
3c147a96-1f5b-46a4-83ce-02766986aa08	94efd52c4c04efc097cf083727f6cd615be5efc64b2f0203ec9693fd4b6fec2f	2025-11-13 14:56:29.850195-03	20251113175629_cambios_en_la_db	\N	\N	2025-11-13 14:56:29.832107-03	1
\.


--
-- Name: Comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comentario_id_seq"', 1, false);


--
-- Name: IndiceMapa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."IndiceMapa_id_seq"', 1, false);


--
-- Name: IndiceReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."IndiceReporte_id_seq"', 1, false);


--
-- Name: MapaGeografico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MapaGeografico_id_seq"', 1, false);


--
-- Name: MapaReporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."MapaReporte_id_seq"', 1, false);


--
-- Name: Reporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Reporte_id_seq"', 19, true);


--
-- Name: SoporteGrafico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SoporteGrafico_id_seq"', 25, true);


--
-- Name: TipoDeIncidencia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoDeIncidencia_id_seq"', 1, false);


--
-- Name: Ubicacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ubicacion_id_seq"', 4, true);


--
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 2, true);


--
-- Name: Comentario Comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_pkey" PRIMARY KEY (id);


--
-- Name: IndiceMapa IndiceMapa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa"
    ADD CONSTRAINT "IndiceMapa_pkey" PRIMARY KEY (id);


--
-- Name: IndiceReporte IndiceReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_pkey" PRIMARY KEY (id);


--
-- Name: MapaGeografico MapaGeografico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_pkey" PRIMARY KEY (id);


--
-- Name: MapaReporte MapaReporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_pkey" PRIMARY KEY (id);


--
-- Name: Reporte Reporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_pkey" PRIMARY KEY (id);


--
-- Name: SoporteGrafico SoporteGrafico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SoporteGrafico"
    ADD CONSTRAINT "SoporteGrafico_pkey" PRIMARY KEY (id);


--
-- Name: TipoDeIncidencia TipoDeIncidencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoDeIncidencia"
    ADD CONSTRAINT "TipoDeIncidencia_pkey" PRIMARY KEY (id);


--
-- Name: Ubicacion Ubicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ubicacion"
    ADD CONSTRAINT "Ubicacion_pkey" PRIMARY KEY (id);


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Usuario_documento_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_documento_key" ON public."Usuario" USING btree (documento);


--
-- Name: Usuario_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_email_key" ON public."Usuario" USING btree (email);


--
-- Name: Usuario_password_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Usuario_password_key" ON public."Usuario" USING btree (password);


--
-- Name: Comentario Comentario_id_soporteGrafico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES public."SoporteGrafico"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comentario Comentario_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comentario"
    ADD CONSTRAINT "Comentario_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: IndiceMapa IndiceMapa_id_tipoDeIncidencia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceMapa"
    ADD CONSTRAINT "IndiceMapa_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES public."TipoDeIncidencia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: IndiceReporte IndiceReporte_id_indiceMapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES public."IndiceMapa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: IndiceReporte IndiceReporte_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."IndiceReporte"
    ADD CONSTRAINT "IndiceReporte_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MapaGeografico MapaGeografico_id_indiceMapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_id_indiceMapa_fkey" FOREIGN KEY ("id_indiceMapa") REFERENCES public."IndiceMapa"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MapaGeografico MapaGeografico_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaGeografico"
    ADD CONSTRAINT "MapaGeografico_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MapaReporte MapaReporte_id_mapaGeografico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_id_mapaGeografico_fkey" FOREIGN KEY ("id_mapaGeografico") REFERENCES public."MapaGeografico"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MapaReporte MapaReporte_id_reporte_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MapaReporte"
    ADD CONSTRAINT "MapaReporte_id_reporte_fkey" FOREIGN KEY (id_reporte) REFERENCES public."Reporte"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reporte Reporte_id_soporteGrafico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_soporteGrafico_fkey" FOREIGN KEY ("id_soporteGrafico") REFERENCES public."SoporteGrafico"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reporte Reporte_id_tipoDeIncidencia_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_tipoDeIncidencia_fkey" FOREIGN KEY ("id_tipoDeIncidencia") REFERENCES public."TipoDeIncidencia"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reporte Reporte_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reporte Reporte_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reporte"
    ADD CONSTRAINT "Reporte_id_usuario_fkey" FOREIGN KEY (id_usuario) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Usuario Usuario_id_ubicacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_id_ubicacion_fkey" FOREIGN KEY (id_ubicacion) REFERENCES public."Ubicacion"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict F4aGwxLVTCcpiE1AZMDv34YlAkJu7MchqsZH4s1ot06rvnkocpw57T9F8vQj9Gq

