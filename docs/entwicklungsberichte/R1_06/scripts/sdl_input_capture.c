#define _GNU_SOURCE
#include <dlfcn.h>
#include <stdio.h>
#include <time.h>
#include <stdlib.h>
static const char* io_path(const char* name){static char path[4096];const char* dir=getenv("R106_IO_DIR");snprintf(path,sizeof path,"%s/%s",dir?dir:".",name);return path;}
static time_t last;
void cap(void *s){time_t n=time(0);if(n==last)return;last=n;char p[256];snprintf(p,sizeof p,"%s",io_path("frame.bmp"));void*(*rw)(const char*,const char*)=dlsym(RTLD_NEXT,"SDL_RWFromFile");int(*save)(void*,void*,int)=dlsym(RTLD_NEXT,"SDL_SaveBMP_RW");if(rw&&save)save(s,rw(p,"wb"),1);}
int SDL_Flip(void*s){int(*f)(void*)=dlsym(RTLD_NEXT,"SDL_Flip");cap(s);return f(s);}
void SDL_UpdateRect(void*s,int x,int y,unsigned w,unsigned h){void(*f)(void*,int,int,unsigned,unsigned)=dlsym(RTLD_NEXT,"SDL_UpdateRect");cap(s);f(s,x,y,w,h);}
void SDL_UpdateRects(void*s,int n,void*r){void(*f)(void*,int,void*)=dlsym(RTLD_NEXT,"SDL_UpdateRects");cap(s);f(s,n,r);}

#include <stdlib.h>
#include <string.h>
#include <unistd.h>


int SDL_PollEvent(void*e){
 void*(*get)(void)=dlsym(RTLD_NEXT,"SDL_GetVideoSurface");if(get&&get())cap(get());
 int(*real)(void*)=dlsym(RTLD_NEXT,"SDL_PollEvent");static long pos=0; static int focus=0; if(e&&!focus){memset(e,0,24);((unsigned char*)e)[0]=1;((unsigned char*)e)[1]=1;((unsigned char*)e)[2]=7;focus=1;return 1;} static unsigned prev=0;unsigned(*ticks)(void)=dlsym(RTLD_NEXT,"SDL_GetTicks");unsigned now=ticks();
 if(e&&now>3000&&now-prev>150){FILE*f=fopen(io_path("input"),"r");if(f){fseek(f,pos,SEEK_SET);char line[100];if(fgets(line,100,f)){pos=ftell(f);prev=now;memset(e,0,24);unsigned char*p=e;int x,y,k;unsigned short a,b;
 if(sscanf(line,"move %d %d",&x,&y)==2){p[0]=4;a=x;b=y;memcpy(p+4,&a,2);memcpy(p+6,&b,2);short dx=x-320,dy=y-240;memcpy(p+8,&dx,2);memcpy(p+10,&dy,2);}
 else if(sscanf(line,"down %d %d",&x,&y)==2||sscanf(line,"up %d %d",&x,&y)==2){p[0]=(line[0]=='d'?5:6);p[2]=1;p[3]=(p[0]==5);a=x;b=y;memcpy(p+4,&a,2);memcpy(p+6,&b,2);}
 else if(sscanf(line,"key %d",&k)==1){p[0]=2;p[2]=1;memcpy(p+8,&k,4);}else if(sscanf(line,"release %d",&k)==1){p[0]=3;memcpy(p+8,&k,4);}
 FILE*l=fopen(io_path("input.log"),"a");if(l){fprintf(l,"%u %s",now,line);fclose(l);}fclose(f);return 1;}fclose(f);}}
 return real(e);
}
