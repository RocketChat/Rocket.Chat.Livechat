import { parseISO } from 'date-fns/fp';
import isSameDay from 'date-fns/isSameDay';
import { h } from 'preact';
import {useState} from 'preact/compat';
import { createClassName, getAttachmentUrl, MemoizedComponent } from '../../helpers';
import styles from './styles.scss';
import {MessageTime} from '../MessageTime/index';
import {parseDate} from '../MessageTime/index';
import { ButtonGroup } from '../../ButtonGroup';
import { Button } from '../../Button';
import {MessageContainer} from '../MessageContainer';

// get sessionid and put session id in iframe link.
//<iframe style="height:80%" src="localhost:3000/livechat/sessionId"></iframe>
const GetSessionId=(session)=>{
	return(
		<Screen.Content nopadding>
			<div className={createClassName(styles, 'call')}>
			<iframe style="height:80%" src=""></iframe>
			</div>
		</Screen.Content>
	);
}

// show call start time function.
export const ShowCallTime=(props)=>{
    return(
       <hr><MessageContainer>
        <div style="align-items:center;text-align:center;color:grey;">
        <time
        dateTime={new Date(props.stime).toISOString()}>
        <div>Call started at {parseDate(props.stime)}</div>
        </time>
    </div>
    </MessageContainer></hr>
    );
}

// call notification with accept and reject option.
export const CallNotification=(props)=>{
    const[isframe,setIframe]=useState(false);
    const[show,setShow]=useState(true);
    
    const acceptClick=()=>{
        setShow(!{show});
        setIframe(true);
    }

    const declineClick=()=>{
          setShow(false);
    }

	return(
        <div>
        { show ? (<Screen.Content nopadding>
		<div className={createClassName(styles, 'call')}>
		<h3 >Incoming video Call</h3>
		<div className={createClassName(styles, 'btn')}> 
		<Button onClick={declineClick} danger>Decline</Button>
		<Button onClick={acceptClick} success >Accept</Button></div></div></Screen.Content>):null} 
        {isframe ? (<GetSessionId session={props.session}/>) : null }
    </div>)}