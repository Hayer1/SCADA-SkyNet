var myscada=require('./myscada');
myscada.init();

//Read tags for tag group OutPLS

var kkb_i=0;

//sdfsdfsd


setInterval(function() {  
    var t11ii, t41ii, t1ii, t2ii, t3ii, t4ii, t5ii, t6ii;
    
    myscada.readTagsSymbolic("OutPLC", function (err,data){
  if (!err){
    var t11i=data['t11i'].value;
    var t11i_err=data['t11i'].err;
    var t41i=data['t41i'].value;
    var t41i_err=data['t41i'].err;
  }
    myscada.readTagsSymbolic("T1", function (err,data){
  if (!err){
    var t1i=data['t1i'].value;
    var t1i_err=data['t1i'].err;
  } 
      myscada.readTagsSymbolic("T2", function (err,data){
  if (!err){
    var t2i=data['t2i'].value;
    var t2i_err=data['t2i'].err;
  }
      myscada.readTagsSymbolic("T3", function (err,data){
  if (!err){
    var t3i=data['t3i'].value;
    var t3i_err=data['t3i'].err;
  }
      myscada.readTagsSymbolic("T4", function (err,data){
  if (!err){
    var t4i=data['t4i'].value;
    var t4i_err=data['t4i'].err;
  }
      myscada.readTagsSymbolic("T5", function (err,data){
  if (!err){
    var t5i=data['t5i'].value;
    var t5i_err=data['t5i'].err;
  }
      myscada.readTagsSymbolic("T6", function (err,data){
  if (!err){
    var t6i=data['t6i'].value;
    var t6i_err=data['t6i'].err;
  }
    myscada.readTagsSymbolic("dataPLC", function (err,data){
        if (!err){
            var t1=data['t1'].value;
            var t1_err=data['t1'].err;
            var t2=data['t2'].value;
            var t2_err=data['t2'].err;
            var t3=data['t3'].value;
            var t3_err=data['t3'].err;            
            var t4=data['t4'].value;
            var t4_err=data['t4'].err;
            var t5=data['t5'].value;
            var t5_err=data['t5'].err;
            var fanIn=data['fanIn'].value;
            var fanIn_err=data['fanIn'].err;
            var fanOut=data['fanOut'].value;
            var fanOut_err=data['fanOut'].err;
            var shimNKP=data['shimNKP'].value;
            var shimNKP_err=data['shimNKP'].err;
            var shimNKD=data['shimNKD'].value;
            var shimNKD_err=data['shimNKD'].err;
            var nkp=data['nkp'].value;
            var nkp_err=data['nkp'].err;
            var nkd=data['nkd'].value;
            var nkd_err=data['nkd'].err;
            var out1=data['out1'].value;
            var out1_err=data['out1'].err;
            var bp=data['bp'].value;
            var bp_err=data['bp'].err;
            var kkb=data['kkb'].value;
            var kkb_err=data['kkb'].err;
            var t6=data['t6'].value;
            var t6_err=data['t6'].err;            
            var t11=data['t11'].value;
            var t11_err=data['t11'].err;
            var t41=data['t41'].value;
            var t41_err=data['t41'].err;
            var out3=data['out3'].value;
            var out3_err=data['out3'].err;
        }
//Read tags for tag group InParam
    myscada.readTagsSymbolic("InParam", function (err,data){
        if (!err){
            var m1rashod=data['m1rashod'].value;
            var m1rashod_err=data['m1rashod'].err;
            var m2rashod=data['m2rashod'].value;
            var m2rashod_err=data['m2rashod'].err;
            var kpdRecuper=data['kpdRecuper'].value;
            var kpdRecuper_err=data['kpdRecuper'].err;
            var q1=data['q1'].value;
            var q1_err=data['q1'].err;
            var q2=data['q2'].value;
            var q2_err=data['q2'].err;
            var t2scr=data['t2scr'].value;
            var t2scr_err=data['t2scr'].err;
            var t3scr=data['t3scr'].value;
            var t3scr_err=data['t3scr'].err;
            var t6scr=data['t6scr'].value;
            var t6scr_err=data['t6scr'].err;
            var t5scr=data['t5scr'].value;
            var t5scr_err=data['t5scr'].err;
            var bpProcentOtVsego=data['bpProcentOtVsego'].value;
            var bpProcentOtVsego_err=data['bpProcentOtVsego'].err;
            var bpRezhim=data['bpRezhim'].value;
            var bpRezhim_err=data['bpRezhim'].err;
            var kkb_q=data['kkb_q'].value;
            var kkb_q_err=data['kkb_q'].err;
            var t4scr=data['t4scr'].value;
            var t4scr_err=data['t4scr'].err;
            var t1scr=data['t1scr'].value;
            var t1scr_err=data['t1scr'].err;
            var kkb_an=data['kkb_an'].value;
            var kkb_an_err=data['kkb_an'].err;
        }
        //Тело программы
        //
        //
            var k_bp = bp_func(bpRezhim, bp, bpProcentOtVsego);
            var m1rashod_ = fanIn / 10;
            var m1rashod__ = m1rashod_ * k_bp;
            var m2rashod_ = fanOut / 10;
            var kkb_;
            
            t1ii = t1;
            t2ii = t2;
            t3ii = t3;
            t4ii = t4;
            t5ii = t5;
            t6ii = t6;
            t11ii = t11;
            t41ii = t41;
            
                   
            /////////////////////Преднагрев
            
            if (nkp) {
                t11ii = ten (t1, m1rashod ,m1rashod_, q1, shimNKP);
            } else {
                t11ii = t1;
            };
            
            /////////////////////Рекуператор
            
            var recup = recuperator(m1rashod, m1rashod__, m1rashod_, m2rashod, m2rashod_, t11, t4, kpdRecuper); 
            t2ii = recup[0];
            t6ii = recup[1];
            
            
            
            
            /////////////////////Основной нагреватель (Электро)
            if (nkd && t5scr) {
                t41ii = ten(t6, m1rashod ,m1rashod_, q1, (out1 * 10));
            } 
            else if (!nkd) {
                t41ii = t6;
            }
            else {
                t41ii = t6;
            }; 
            
            /////////////////////ККб
            kkb_f (kkb, t5scr, kkb_an, out3); 
            
            if (kkb_i > 0){
                    t5ii = kkbDiscr(t41, m1rashod ,m1rashod_, kkb_q, kkb_i);
                }
                else if(kkb_i === 0){
                    t5ii = t41;
                }
                else {
                    kkb_i = 0;
                    t5ii = t41;
                };
                
            
            
            
            
            

         
            /////////////////////Write tags for tag group OutPLS
            var options={};
            options['name']="OutPLS";
            options['values'] = {};
            options['values']['t11i']=t11ii * 10;
            options['values']['t41i']=t41ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
            });
            
            if (t1scr) {
            var options={};
            options['name']="T1";
            options['values'] = {};
            options['values']['t1i']=t1ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}

            if (t2scr) {
            var options={};
            options['name']="T2";
            options['values'] = {};
            options['values']['t2i']=t2ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}
            if (t3scr) {
            var options={};
            options['name']="T3";
            options['values'] = {};
            options['values']['t3i']=t3ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}
            if (t4scr) {
            var options={};
            options['name']="T4";
            options['values'] = {};
            options['values']['t4i']=t4ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}
            if (t5scr) {
            var options={};
            options['name']="T5";
            options['values'] = {};
            options['values']['t5i']=t5ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}
            if (t6scr) {
            var options={};
            options['name']="T6";
            options['values'] = {};
            options['values']['t6i']=t6ii * 10;
            myscada.writeTags(options, function (err,data){
              if (err){
                //write error
              }
              } 
            );}
            
           
            /////////////////////Write tags for tag group Out
            var options2={};
            options2['name']="Out";
            options2['values'] = {};
            options2['values']['t11']=t11ii;
            options2['values']['tt4']=kkb_i * 10;//kkb;
            options2['values']['tt2']=kkb_i;//kkb_;
            options2['values']['tt5']=k_bp;
            options2['values']['t41']=t41ii;
            myscada.writeTags(options2, function (err,data){
              if (err){
                //write error
              }
            });
            
            
});
});
});
});
});
});
});
});
});
}, 1000);



function kkb_f(kkb,t5scr, kkb_an, out3) {
    var max;
    (kkb_an === 1) ? max = out3 * 10 : max = 100;
    if (t5scr === 0)
        {
            kkb_i = 0;
        }
    else if (kkb === 1 && kkb_i < max)
        {
            kkb_i = kkb_i + 0.1;
        }
    else if (kkb === 1 && kkb_i >= max)
        {
            kkb_i = max;
        }
    else if (kkb !== 1 && kkb_i > 0)
        {
            kkb_i = kkb_i - 1;
        }
    else kkb_i = 0;
    };

function ten(tIn, w, w_proc, q, q_) { 
    //w - расход, q - элТен
    
    if (w>0 && w_proc>0 && q_>0 && q>0)
    {
    var tOut = (q * q_ * 10 / (0.27912) / (1.225) / (w*w_proc))+tIn;
    }
    else 
    {
        tOut = tIn;
    }
    
    return tOut;
};

function kkbDiscr(tIn, w, w_proc, q, q_) { 
    //w - расход, q - KKB
    
    if (w>0 && w_proc>0 && q_>0 && q>0)
    {
    var tOut = -(q * q_ * 10 / (0.27912) / (1.225) / (w*w_proc))+tIn;
    }
    else {tOut = tIn;}
    
    return tOut;
};

function bp_func(bpRezhim, bp, bpProcentOtVsego) 
{ 
    //k - koeficient of air walking through recuperator
    //bpRezhim 0-no BP, 1-discr BP, 2 - analog
    var k;
    if (bpRezhim === 0)
    {
        k = 1;
    }
    else if (bpRezhim === 1)
    {
            k = 1 - bpProcentOtVsego / 100 + bpProcentOtVsego / 100 * (1- bp / 100) ;
    }
    else if (bpRezhim === 2)
    {
        k = 1;
    };
       
    return k;
};
   
function recuperator(w1, w1__, w1_, w2, w2_, t1, t4, kpd) 
{
    var tIn, tOut;
    var t_rec;
    
    if (w1>0.01 && w2>0.01 && w1__>0.01 && w2_>0.01)
    {
        var k = (w1 * w1__) / (w2 * w2_);
        
        if (k >= 1)
        {
            t_rec = t1 + 1 / k * (t4 - t1) * kpd / 100;
            tOut =  t4 + k * (t1 - t_rec);
        } 
        else if (0 < k && k < 1)
        {
            tOut = t4 + k * (t1 - t4) * kpd / 100;
            t_rec = 1 / k * (t4 - tOut) + t1;
        }
        else 
        {
            tOut = t4;
            tIn = t4;
        };
        tIn = t1 + w1__/w1_ * (t_rec - t1);
    }
    
    else if (w1_ <= 0.01){
        tIn = t4;
        tOut = t1;
    }
    else if (w1__ <= 0.01 && w1_ > 0.01) {
        tIn = t1;
        tOut = t4;
    }
    else if (w2 <= 0.01 || w2_ <= 0.01) {
        tOut = t1;
        tIn = t1;
    } 
    else {
        tIn = 999;
        tOut = 999;
    }
    
    return [tOut , tIn];
    }
  

function tNaruzh() {
    
}



////process data sent from the view script
////in view script, please, use function myscada.sendDataToServerSideScript
//myscada.dataFromViewScripts = function (data,callback)
//{
//	//process data
//
//	//return value back to view script
//	//you must always return a value even empty
//	callback("return value");
//};
//


