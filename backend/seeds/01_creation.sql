--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying,
    password character varying
);


ALTER TABLE public.users OWNER TO myuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO myuser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: videos; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title character varying,
    description character varying,
    url character varying,
    user_id integer
);


ALTER TABLE public.videos OWNER TO myuser;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO myuser;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.users (id, email, password) FROM stdin;
1	string	string
2	lamnguyen10@acm.org	123
3	admin@youscale.com	123
4	nguyenhoang229@gmail.com	123
5	kKX9R@example.com	123123
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.videos (id, title, description, url, user_id) FROM stdin;
1	\N	\N	string	\N
2	How Sweet - NewJeans ニュージーンズ 뉴진스 [Music Bank] | KBS WORLD TV 240531	How Sweet - NewJeans ニュージーンズ 뉴진스 [Music Bank] | KBS WORLD TV 240531#MusicBank #뮤직뱅크 #ミュージックバンク #音乐银行#HongEunChae #홍은채 #MoonSangmin #문상민Fri 17:10 | Re-run : S...	https://www.youtube.com/watch?v=PJgVo3M7Sxk	1
3	How Sweet - NewJeans ニュージーンズ 뉴진스 [Music Bank] | KBS WORLD TV 240531	How Sweet - NewJeans ニュージーンズ 뉴진스 [Music Bank] | KBS WORLD TV 240531#MusicBank #뮤직뱅크 #ミュージックバンク #音乐银行#HongEunChae #홍은채 #MoonSangmin #문상민Fri 17:10 | Re-run : S...	https://www.youtube.com/watch?v=PJgVo3M7Sxk	1
4	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
5	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
6	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
7	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
8	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
9	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/watch?v=XyHkoKwPtaw	2
10	Sean Paul: Tiny Desk Concert	Bobby Carter | May 31, 2024The vibrancy that bounces off the screen while watching Sean Paul’s Tiny Desk concert is undeniable. Hearing his voice just a few ...	https://www.youtube.com/embed/XyHkoKwPtaw	2
11	Justin Timberlake: Tiny Desk Concert	Stephen Thompson | March 15, 2024Walking into the room shortly before Justin Timberlake took our cramped stage, I overheard someone on his team wondering alo...	https://www.youtube.com/embed/cMIJsoaxRjk	2
12	[4K] 240525 뉴진스 NewJeans 직캠 Full Verㅣ고려대학교 IPSELENTI (How Sweet, Bubble Gum, ETA, New Jeans)	✨2024 축제도 상상 그 이상의영상, KTN과 함께✨=Timeline=00:18-02:02 New Jeans06:27-09:41 Bubble Gum11:12-14:37 민족의 아리아(고려대 응원가)18:06-21:44 How Sweet23:52-26:23 E.T.A#뉴진스 #Ne...	https://www.youtube.com/embed/Mg1MnMOmh4M	2
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.videos_id_seq', 36, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: videos videos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

